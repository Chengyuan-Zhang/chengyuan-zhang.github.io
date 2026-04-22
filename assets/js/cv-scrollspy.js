(function () {
  'use strict';

  function init() {
    var links = document.querySelectorAll('.cv-side__link');
    if (!links.length) return;
    var sections = [];
    links.forEach(function (l) {
      var id = l.getAttribute('href').replace('#', '');
      var s = document.getElementById(id);
      if (s) sections.push({ link: l, section: s });
    });
    if (!sections.length) return;

    function onScroll() {
      var offset = 120;
      var scrollY = window.scrollY || window.pageYOffset;
      var active = sections[0];
      sections.forEach(function (s) {
        var top = s.section.getBoundingClientRect().top + scrollY - offset;
        if (scrollY >= top) active = s;
      });
      sections.forEach(function (s) {
        s.link.classList.toggle('is-active', s === active);
      });
    }

    // Smooth scroll with header offset
    links.forEach(function (l) {
      l.addEventListener('click', function (e) {
        var id = l.getAttribute('href').replace('#', '');
        var s = document.getElementById(id);
        if (!s) return;
        e.preventDefault();
        var y = s.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.replaceState(null, '', '#' + id);
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
