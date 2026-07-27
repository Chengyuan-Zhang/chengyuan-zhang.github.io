(function () {
  'use strict';

  // Topics come from the data-topics attribute that _pages/notes.md writes out
  // from _data/note_topics.yml, and the button list is read from the DOM, so
  // adding a topic is a data-only change and needs no edit here.

  function init() {
    var filter = document.getElementById('notes-filter');
    var scope  = document.getElementById('notes-list');
    if (!filter || !scope) return;

    var items    = Array.prototype.slice.call(scope.children);
    var buttons  = Array.prototype.slice.call(filter.querySelectorAll('.topic-btn'));
    var emptyMsg = document.getElementById('notes-empty-msg');
    var valid    = buttons.map(function (b) { return b.getAttribute('data-topic'); });

    function topicsOf(li) {
      return (li.getAttribute('data-topics') || '').split(/\s+/).filter(Boolean);
    }

    function applyFilter(topic, updateHash) {
      if (valid.indexOf(topic) === -1) topic = 'all';
      var any = false;
      items.forEach(function (li) {
        var match = topic === 'all' || topicsOf(li).indexOf(topic) !== -1;
        li.hidden = !match;
        if (match) any = true;
      });
      if (emptyMsg) emptyMsg.hidden = any;
      buttons.forEach(function (b) {
        var active = b.getAttribute('data-topic') === topic;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (updateHash === false) return;
      var base = window.location.pathname + window.location.search;
      history.replaceState(null, '', topic === 'all' ? base : base + '#topic=' + topic);
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        applyFilter(b.getAttribute('data-topic'), true);
      });
    });

    var hash = (window.location.hash || '').replace('#', '');
    applyFilter(hash.indexOf('topic=') === 0 ? hash.slice(6) : 'all', false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
