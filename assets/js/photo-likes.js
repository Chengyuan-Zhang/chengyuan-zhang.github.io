/*
 * Photo likes for the miscellaneous gallery.
 *
 * Counts live in Abacus (https://abacus.jasoncameron.dev), a free keyless
 * counter API. Two things matter about it:
 *
 *   1. It rate limits to 30 requests per IP per 10 seconds. The gallery has
 *      well over thirty photos, so counts are fetched lazily as tiles scroll
 *      into view and every request goes through a throttled queue.
 *   2. It is a free third-party service and may one day disappear. Nothing
 *      here depends on it: if a request fails the button still responds, it
 *      just shows no number.
 *
 * A visitor's own likes are remembered in localStorage. That stops the button
 * double counting in normal use; it is not, and does not try to be, tamper
 * proof.
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://abacus.jasoncameron.dev';
  var NAMESPACE = 'chengyuan-zhang.github.io';
  var STORE_KEY = 'photo-likes';
  var GAP_MS = 400;          // 2.5 req/s, comfortably under 30 per 10 s
  var MAX_PENDING = 200;

  /* Local record of what this visitor has liked ------------------------- */

  function readLiked() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function rememberLiked(key) {
    try {
      var liked = readLiked();
      liked[key] = 1;
      localStorage.setItem(STORE_KEY, JSON.stringify(liked));
    } catch (e) { /* private mode, nothing to do */ }
  }

  /* Throttled request queue -------------------------------------------- */

  var queue = [];
  var draining = false;

  function drain() {
    if (draining) return;
    draining = true;
    (function step() {
      var job = queue.shift();
      if (!job) { draining = false; return; }
      job().then(function () {
        setTimeout(step, GAP_MS);
      }, function () {
        setTimeout(step, GAP_MS);
      });
    })();
  }

  function enqueue(job, urgent) {
    if (queue.length > MAX_PENDING) return;
    if (urgent) queue.unshift(job); else queue.push(job);
    drain();
  }

  function request(path) {
    return fetch(ENDPOINT + path, { mode: 'cors', cache: 'no-store' })
      .then(function (r) {
        if (r.status === 404) return { value: 0 };   // counter not created yet
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      });
  }

  /* Rendering ----------------------------------------------------------- */

  function render(btn, value) {
    var out = btn.querySelector('.photo-like__count');
    if (typeof value === 'number' && value > 0) {
      out.textContent = value;
      btn.classList.add('has-count');
    } else {
      out.textContent = '';
      btn.classList.remove('has-count');
    }
  }

  function markLiked(btn) {
    btn.classList.add('is-liked');
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'You liked this photo');
  }

  function bump(btn) {
    btn.classList.add('is-bumping');
    setTimeout(function () { btn.classList.remove('is-bumping'); }, 220);
  }

  /* Wiring -------------------------------------------------------------- */

  function init() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('.photo-like[data-like]'));
    if (!buttons.length || typeof fetch !== 'function') return;

    var liked = readLiked();

    buttons.forEach(function (btn) {
      if (liked[btn.getAttribute('data-like')]) markLiked(btn);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();                       // never open the lightbox
        var key = btn.getAttribute('data-like');
        if (btn.classList.contains('is-liked')) return;   // one like per visitor

        markLiked(btn);
        bump(btn);
        rememberLiked(key);

        // Show the increment immediately; the server value replaces it.
        var shown = parseInt(btn.querySelector('.photo-like__count').textContent, 10);
        render(btn, (isNaN(shown) ? 0 : shown) + 1);

        enqueue(function () {
          return request('/hit/' + NAMESPACE + '/' + key)
            .then(function (d) { render(btn, d.value); })
            .catch(function () { /* keep the optimistic number */ });
        }, true);
      });
    });

    // Fetch counts only for tiles that actually come into view.
    if (!('IntersectionObserver' in window)) return;

    var seen = Object.create(null);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var btn = entry.target;
        var key = btn.getAttribute('data-like');
        io.unobserve(btn);
        if (seen[key]) return;
        seen[key] = 1;
        enqueue(function () {
          return request('/get/' + NAMESPACE + '/' + key)
            .then(function (d) { render(btn, d.value); })
            .catch(function () { /* leave the button bare */ });
        });
      });
    }, { rootMargin: '150px 0px' });

    buttons.forEach(function (btn) { io.observe(btn); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
