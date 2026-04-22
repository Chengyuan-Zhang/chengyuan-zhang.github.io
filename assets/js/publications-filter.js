(function () {
  'use strict';

  var TOPIC_MAP = {
    '\uD83D\uDCD5': 'traffic',         // 📕
    '\uD83D\uDCD8': 'multiagent',      // 📘
    '\uD83D\uDCD7': 'spatiotemporal',  // 📗
    '\uD83D\uDCD9': 'bayesian'         // 📙
  };
  var VALID_TOPICS = ['all', 'traffic', 'multiagent', 'spatiotemporal', 'bayesian'];

  function init() {
    var filter = document.getElementById('topic-filter');
    if (!filter) return;

    var content = document.querySelector('.page__content') ||
                  document.querySelector('.page') ||
                  document.querySelector('main') ||
                  document.body;
    if (!content) return;

    var lists = content.querySelectorAll('ul');
    var items = [];
    lists.forEach(function (ul) {
      // Skip anything inside the filter toolbar itself
      if (filter.contains(ul)) return;
      ul.querySelectorAll(':scope > li').forEach(function (li) {
        items.push(li);
      });
    });

    items.forEach(function (li) {
      var text = li.textContent || '';
      var topics = [];
      Object.keys(TOPIC_MAP).forEach(function (emoji) {
        if (text.indexOf(emoji) !== -1) topics.push(TOPIC_MAP[emoji]);
      });
      if (topics.length) li.setAttribute('data-topics', topics.join(' '));
    });

    var buttons = filter.querySelectorAll('.topic-btn');
    var emptyMsg = document.getElementById('pub-empty-msg');

    function applyFilter(topic) {
      if (VALID_TOPICS.indexOf(topic) === -1) topic = 'all';
      var anyVisible = false;

      items.forEach(function (li) {
        if (topic === 'all') {
          li.hidden = false;
          anyVisible = true;
          return;
        }
        var topics = (li.getAttribute('data-topics') || '').split(/\s+/);
        var match = topics.indexOf(topic) !== -1;
        li.hidden = !match;
        if (match) anyVisible = true;
      });

      // Hide section headings with no visible items below
      var headings = content.querySelectorAll('h2');
      headings.forEach(function (h) {
        var next = h.nextElementSibling;
        while (next && next.tagName !== 'UL' && next.tagName !== 'H2') {
          next = next.nextElementSibling;
        }
        if (!next || next.tagName !== 'UL') { h.hidden = false; return; }
        var visibleLis = next.querySelectorAll('li:not([hidden])');
        var hide = visibleLis.length === 0;
        h.hidden = hide;
        next.hidden = hide;
      });

      if (emptyMsg) emptyMsg.hidden = anyVisible;

      buttons.forEach(function (b) {
        var active = b.getAttribute('data-topic') === topic;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      if (topic === 'all') {
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
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
