(function () {
  'use strict';

  var BIB_URL = '/files/chengyuan-zhang.bib';
  var bibPromise = null;

  function loadBib() {
    if (!bibPromise) {
      bibPromise = fetch(BIB_URL, { credentials: 'same-origin' })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.text();
        })
        .then(parseBib);
    }
    return bibPromise;
  }

  // Split the file into { key: entryText } by scanning balanced braces.
  function parseBib(text) {
    var entries = {};
    var re = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
    var m;
    while ((m = re.exec(text)) !== null) {
      var start = text.indexOf('{', m.index);
      var depth = 0;
      var i = start;
      for (; i < text.length; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') {
          depth--;
          if (depth === 0) break;
        }
      }
      if (depth === 0) entries[m[2]] = text.slice(m.index, i + 1);
    }
    return entries;
  }

  function copy(text, button) {
    var done = function () {
      var old = button.textContent;
      button.textContent = 'Copied';
      button.classList.add('is-copied');
      setTimeout(function () {
        button.textContent = old;
        button.classList.remove('is-copied');
      }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* nothing to do */ }
    document.body.removeChild(ta);
  }

  function buildBox(entry, id) {
    var box = document.createElement('div');
    box.className = 'bib-box';
    box.id = id;

    var pre = document.createElement('pre');
    pre.textContent = entry;

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'bib-copy';
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', function () { copy(entry, copyBtn); });

    box.appendChild(copyBtn);
    box.appendChild(pre);
    return box;
  }

  function toggle(button) {
    var key = button.getAttribute('data-bib');
    var id = 'bib-' + key;
    var existing = document.getElementById(id);

    if (existing) {
      var open = existing.hasAttribute('hidden');
      if (open) existing.removeAttribute('hidden');
      else existing.setAttribute('hidden', '');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }

    button.disabled = true;
    loadBib().then(function (entries) {
      button.disabled = false;
      var entry = entries[key];
      if (!entry) {
        button.textContent = 'unavailable';
        button.disabled = true;
        return;
      }
      button.parentNode.insertBefore(buildBox(entry, id), button.nextSibling);
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-controls', id);
    }, function () {
      button.disabled = false;
      button.textContent = 'unavailable';
    });
  }

  function init() {
    var buttons = document.querySelectorAll('[data-bib]');
    if (!buttons.length) return;
    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute('aria-expanded', 'false');
      b.addEventListener('click', function (e) {
        e.preventDefault();
        toggle(b);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
