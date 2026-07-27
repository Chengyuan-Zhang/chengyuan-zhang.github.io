(function () {
  'use strict';

  function init() {
    var imgs = document.querySelectorAll('.gallery img, .photos img');
    if (!imgs.length) return;

    // Build a single reusable overlay
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Photo viewer');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&times;</button>' +
      '<button class="lightbox__prev"  aria-label="Previous">&lsaquo;</button>' +
      '<button class="lightbox__next"  aria-label="Next">&rsaquo;</button>' +
      '<figure class="lightbox__stage"><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(overlay);

    var imgEl    = overlay.querySelector('img');
    var capEl    = overlay.querySelector('figcaption');
    var closeBtn = overlay.querySelector('.lightbox__close');
    var prevBtn  = overlay.querySelector('.lightbox__prev');
    var nextBtn  = overlay.querySelector('.lightbox__next');
    var list     = Array.prototype.slice.call(imgs);
    var idx      = 0;
    var lastFocused = null;

    function show(i) {
      if (!overlay.classList.contains('is-open')) lastFocused = document.activeElement;
      idx = (i + list.length) % list.length;
      var src = list[idx];
      imgEl.src = src.getAttribute('src');
      imgEl.alt = src.alt || '';
      capEl.textContent = src.getAttribute('data-caption') || src.alt || '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      closeBtn.focus();
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
      imgEl.removeAttribute('src');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
      lastFocused = null;
    }

    // The thumbnails were only clickable, which left the whole gallery
    // unreachable by keyboard. Give each one button semantics in place rather
    // than rewrapping the markup, so the grid and like-button layout are
    // untouched.
    list.forEach(function (img, i) {
      img.style.cursor = 'zoom-in';
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      img.setAttribute('aria-label',
        'Open photo: ' + (img.getAttribute('data-caption') || img.alt || 'untitled'));
      img.addEventListener('click', function () { show(i); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          show(i);
        }
      });
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape')       close();
      else if (e.key === 'ArrowLeft')  show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
      else if (e.key === 'Tab') {
        // Keep focus inside the dialog while it is open.
        var stops = [closeBtn, prevBtn, nextBtn];
        var at = stops.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? at - 1 : at + 1;
        stops[(next + stops.length) % stops.length].focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
