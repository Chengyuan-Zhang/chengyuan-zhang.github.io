(function () {
  'use strict';

  function init() {
    var imgs = document.querySelectorAll('.gallery img, .photos img');
    if (!imgs.length) return;

    // Build a single reusable overlay
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
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

    function show(i) {
      idx = (i + list.length) % list.length;
      var src = list[idx];
      imgEl.src = src.getAttribute('src');
      imgEl.alt = src.alt || '';
      capEl.textContent = src.getAttribute('data-caption') || src.alt || '';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
      imgEl.removeAttribute('src');
    }

    list.forEach(function (img, i) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () { show(i); });
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
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
