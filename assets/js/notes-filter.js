(function () {
  'use strict';

  var TOPIC_MAP = {
    '\uD83D\uDCD9': 'bayesian',     // 📙
    '\uD83D\uDCD5': 'math',         // 📕
    '\uD83D\uDCD8': 'driving',      // 📘
    '\uD83D\uDCD7': 'research'      // 📗
  };
  var VALID = ['all', 'bayesian', 'math', 'driving', 'research'];

  function init() {
    var filter = document.getElementById('notes-filter');
    var scope  = document.getElementById('notes-list');
    if (!filter || !scope) return;

    var items = scope.querySelectorAll(':scope > li');
    items.forEach(function (li) {
      var text = li.textContent || '';
      var topics = [];
      Object.keys(TOPIC_MAP).forEach(function (emoji) {
        if (text.indexOf(emoji) !== -1) topics.push(TOPIC_MAP[emoji]);
      });
      if (topics.length) li.setAttribute('data-topics', topics.join(' '));
    });

    var buttons = filter.querySelectorAll('.topic-btn');
    var emptyMsg = document.getElementById('notes-empty-msg');

    function applyFilter(topic) {
      if (VALID.indexOf(topic) === -1) topic = 'all';
      var any = false;
      items.forEach(function (li) {
        if (topic === 'all') { li.hidden = false; any = true; return; }
        var t = (li.getAttribute('data-topics') || '').split(/\s+/);
        var match = t.indexOf(topic) !== -1;
        li.hidden = !match;
        if (match) any = true;
      });
      if (emptyMsg) emptyMsg.hidden = any;
      buttons.forEach(function (b) {
        var active = b.getAttribute('data-topic') === topic;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (topic === 'all') {
        if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
      } else {
        history.replaceState(null, '', '#topic=' + topic);
      }
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        applyFilter(b.getAttribute('data-topic'));
      });
    });

    var hash = (window.location.hash || '').replace('#', '');
    var initial = 'all';
    if (hash.indexOf('topic=') === 0) initial = hash.slice(6);
    applyFilter(initial);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
