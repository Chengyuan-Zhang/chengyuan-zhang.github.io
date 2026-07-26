/*
 * Site behaviour, replacing the jQuery bundle that used to ship as main.min.js.
 *
 *  - greedy navigation: ported from Luke Jackson's original
 *    (http://codepen.io/lukejacksonn/pen/PwmwWV), which the theme used via
 *    jquery.greedy-navigation.js
 *  - sticky footer: the footer is position:absolute, so the body needs bottom
 *    room equal to its height
 *  - sidebar author links: shown only when the sidebar is wide enough
 *
 * Smooth scrolling and responsive video are handled in CSS, and .sticky uses
 * native position:sticky, so no polyfills are loaded.
 */
(function () {
  'use strict';

  function width(el) {
    return el ? el.getBoundingClientRect().width : 0;
  }

  /* Sticky footer ---------------------------------------------------- */

  function initStickyFooter() {
    var footer = document.querySelector('.page__footer');
    if (!footer) return;

    function bump() {
      var style = window.getComputedStyle(footer);
      var margins = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      document.body.style.marginBottom = (footer.offsetHeight + margins) + 'px';
    }

    bump();
    if (window.ResizeObserver) {
      new ResizeObserver(bump).observe(footer);
    } else {
      window.addEventListener('resize', bump);
    }
    window.addEventListener('load', bump);
  }

  /* Greedy navigation ------------------------------------------------ */

  function initGreedyNav() {
    var nav = document.getElementById('site-nav');
    if (!nav) return;
    var btn = nav.querySelector('button');
    var vlinks = nav.querySelector('.visible-links');
    var hlinks = nav.querySelector('.hidden-links');
    if (!btn || !vlinks || !hlinks) return;

    var breaks = [];

    function update() {
      // Guard against runaway recursion if a measurement ever returns zero.
      for (var guard = 0; guard < 50; guard++) {
        var available = btn.classList.contains('hidden')
          ? width(nav)
          : width(nav) - width(btn) - 30;

        if (width(vlinks) > available) {
          if (!vlinks.lastElementChild) break;
          breaks.push(width(vlinks));
          hlinks.insertBefore(vlinks.lastElementChild, hlinks.firstChild);
          btn.classList.remove('hidden');
        } else {
          if (breaks.length && available > breaks[breaks.length - 1]) {
            if (hlinks.firstElementChild) vlinks.appendChild(hlinks.firstElementChild);
            breaks.pop();
          } else {
            if (breaks.length < 1) {
              btn.classList.add('hidden');
              hlinks.classList.add('hidden');
            }
            break;
          }
        }
      }
      btn.setAttribute('count', breaks.length);
    }

    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = hlinks.classList.toggle('hidden');
      btn.classList.toggle('close');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    update();
  }

  /* Sidebar author links --------------------------------------------- */

  function initSidebar() {
    var urls = document.querySelector('.author__urls');
    if (!urls) return;
    var toggle = document.querySelector('.author__urls-wrapper button');

    function apply() {
      var show = toggle ? window.getComputedStyle(toggle).display === 'none'
                        : window.innerWidth > 1024;
      urls.style.display = show ? '' : 'none';
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        var hidden = urls.style.display === 'none';
        urls.style.display = hidden ? '' : 'none';
        toggle.classList.toggle('open');
      });
    }

    apply();
    window.addEventListener('resize', apply);
  }

  function init() {
    initStickyFooter();
    initGreedyNav();
    initSidebar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
