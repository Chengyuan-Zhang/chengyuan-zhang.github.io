/*
 * Publications-by-year chart (dependency-free, theme-adaptive).
 * Renders a stacked bar chart of publications per year, coloured by type
 * using the colour-blind-safe Okabe-Ito palette. Axes/labels use the page
 * text colour so the chart adapts to light/dark mode automatically.
 *
 * Counts are kept in sync with the list on /publications/.
 */
(function () {
  'use strict';

  var DATA = [
    { year: 2018, journal: 1, conference: 0, preprint: 0, book: 0, patent: 1 },
    { year: 2019, journal: 1, conference: 1, preprint: 0, book: 0, patent: 0 },
    { year: 2020, journal: 0, conference: 1, preprint: 0, book: 0, patent: 0 },
    { year: 2021, journal: 1, conference: 0, preprint: 0, book: 0, patent: 0 },
    { year: 2022, journal: 0, conference: 0, preprint: 0, book: 1, patent: 0 },
    { year: 2023, journal: 3, conference: 1, preprint: 0, book: 1, patent: 0 },
    { year: 2024, journal: 1, conference: 1, preprint: 0, book: 0, patent: 0 },
    { year: 2025, journal: 2, conference: 0, preprint: 1, book: 0, patent: 0 },
    { year: 2026, journal: 0, conference: 2, preprint: 1, book: 0, patent: 0 }
  ];

  // Okabe-Ito palette (colour-blind safe).
  var SERIES = [
    { key: 'journal',    label: 'Journal',    color: '#0072B2' },
    { key: 'conference', label: 'Conference', color: '#E69F00' },
    { key: 'preprint',   label: 'Preprint',   color: '#56B4E9' },
    { key: 'book',       label: 'Book',       color: '#009E73' },
    { key: 'patent',     label: 'Patent',     color: '#CC79A7' }
  ];

  var NS = 'http://www.w3.org/2000/svg';
  function el(name, attrs) {
    var e = document.createElementNS(NS, name);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  function totalOf(d) {
    return SERIES.reduce(function (s, ser) { return s + d[ser.key]; }, 0);
  }

  function render(host) {
    while (host.firstChild) host.removeChild(host.firstChild);

    var W = 720, H = 300, m = { t: 14, r: 14, b: 30, l: 28 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;

    var maxTotal = DATA.reduce(function (mx, d) { return Math.max(mx, totalOf(d)); }, 0);
    var yMax = Math.max(5, maxTotal);
    var grandTotal = DATA.reduce(function (s, d) { return s + totalOf(d); }, 0);

    var band = iw / DATA.length;
    var bw = Math.min(46, band * 0.6);

    var svg = el('svg', {
      viewBox: '0 0 ' + W + ' ' + H,
      role: 'img',
      'aria-label': grandTotal + ' publications from ' + DATA[0].year + ' to ' +
        DATA[DATA.length - 1].year + ', shown per year and split by type (journal, conference, preprint, book, patent).'
    });

    // Y gridlines + tick labels
    for (var t = 0; t <= yMax; t++) {
      var gy = m.t + ih - (t / yMax) * ih;
      svg.appendChild(el('line', {
        x1: m.l, y1: gy, x2: m.l + iw, y2: gy,
        stroke: 'currentColor', 'stroke-width': 1, opacity: t === 0 ? 0.45 : 0.12
      }));
      var lab = el('text', {
        x: m.l - 6, y: gy + 3.5, 'text-anchor': 'end',
        'font-size': 11, fill: 'currentColor', opacity: 0.75
      });
      lab.textContent = t;
      svg.appendChild(lab);
    }

    // Bars (stacked) + year labels
    DATA.forEach(function (d, i) {
      var x = m.l + i * band + (band - bw) / 2;
      var acc = 0;
      SERIES.forEach(function (ser) {
        var v = d[ser.key];
        if (!v) return;
        var h = (v / yMax) * ih;
        var y = m.t + ih - acc - h;
        var rect = el('rect', {
          x: x, y: y, width: bw, height: h, fill: ser.color, rx: 1
        });
        var title = el('title');
        title.textContent = d.year + ' \u2014 ' + v + ' ' + ser.label.toLowerCase() +
          (v > 1 ? 's' : '');
        rect.appendChild(title);
        svg.appendChild(rect);
        acc += h;
      });
      var yl = el('text', {
        x: x + bw / 2, y: m.t + ih + 18, 'text-anchor': 'middle',
        'font-size': 11.5, fill: 'currentColor', opacity: 0.85
      });
      yl.textContent = d.year;
      svg.appendChild(yl);
    });

    host.appendChild(svg);

    // Legend
    var legend = document.createElement('div');
    legend.className = 'pubs-chart__legend';
    SERIES.forEach(function (ser) {
      var total = DATA.reduce(function (s, d) { return s + d[ser.key]; }, 0);
      if (!total) return;
      var item = document.createElement('span');
      var sw = document.createElement('i');
      sw.className = 'pubs-chart__sw';
      sw.style.background = ser.color;
      item.appendChild(sw);
      item.appendChild(document.createTextNode(ser.label + ' (' + total + ')'));
      legend.appendChild(item);
    });
    host.appendChild(legend);

    var cap = document.createElement('p');
    cap.className = 'pubs-chart__cap';
    cap.textContent = grandTotal + ' publications, ' + DATA[0].year + '\u2013' + DATA[DATA.length - 1].year;
    host.appendChild(cap);
  }

  function init() {
    var host = document.getElementById('pubs-chart');
    if (host) render(host);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
