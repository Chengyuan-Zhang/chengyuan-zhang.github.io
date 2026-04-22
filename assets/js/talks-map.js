(function () {
  'use strict';

  // Talk locations (in-person only; online talks are listed but not on the map)
  var TALKS = [
    { lat: 31.2028, lng: 121.4489, city: 'Shanghai, China',          type: 'invited',    date: 'Feb 2026',  venue: 'Tongji University',                           title: 'From Micro Interactions to Traffic Flow' },
    { lat: 39.9612, lng: 116.3428, city: 'Beijing, China',           type: 'invited',    date: 'Nov 2024',  venue: 'Beijing Institute of Technology',             title: 'Bayesian Calibration of Car-Following Models' },
    { lat: 31.0253, lng: 121.4373, city: 'Shanghai, China',          type: 'invited',    date: 'Oct 2024',  venue: 'Shanghai Jiao Tong University',               title: 'Bayesian Calibration of Car-Following Models' },
    { lat: 42.2808, lng: -83.7430, city: 'Ann Arbor, MI, USA',       type: 'conference', date: 'Jul 2024',  venue: 'ISTTT25',                                     title: 'Calibrating Car-Following Models via Bayesian Dynamic Regression' },
    { lat: 38.9072, lng: -77.0369, city: 'Washington, DC, USA',      type: 'conference', date: 'Jan 2023',  venue: 'TRB Annual Meeting 2023',                     title: 'Bayesian Calibration of the Intelligent Driver Model' },
    { lat: -36.8485, lng: 174.7633, city: 'Auckland, New Zealand',   type: 'conference', date: 'Oct 2019',  venue: 'IEEE ITSC 2019',                              title: 'Learning Multi-Vehicle Interaction Patterns from Video' },
    { lat: 40.4406, lng: -79.9959, city: 'Pittsburgh, PA, USA',      type: 'workshop',   date: 'Aug 2018',  venue: 'SAILER Workshop at CMU',                      title: 'Cam-Linkage Double-Parallelogram Parking System' }
  ];

  var COLORS = {
    invited:    '#8a2432',
    conference: '#2a5780',
    workshop:   '#6a5515'
  };

  function init() {
    var el = document.getElementById('talks-map');
    if (!el || typeof L === 'undefined') return;

    var isDark = document.documentElement.classList.contains('dark-mode');

    var lightTiles = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    var darkTiles  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    var attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

    var map = L.map(el, {
      worldCopyJump: true,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true
    }).setView([30, 10], 2);

    var tileLayer = L.tileLayer(isDark ? darkTiles : lightTiles, {
      attribution: attribution,
      subdomains: 'abcd',
      maxZoom: 8,
      minZoom: 1
    }).addTo(map);

    // Swap tile layer when user toggles dark mode
    var observer = new MutationObserver(function () {
      var nowDark = document.documentElement.classList.contains('dark-mode');
      tileLayer.setUrl(nowDark ? darkTiles : lightTiles);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Bounds for auto-fit
    var bounds = L.latLngBounds([]);

    // Group markers at nearly-same coord with small radial offset
    var seen = {};
    TALKS.forEach(function (t) {
      var key = t.lat.toFixed(2) + ',' + t.lng.toFixed(2);
      var n = seen[key] || 0;
      seen[key] = n + 1;
      var offset = n * 0.8;
      var lat = t.lat + offset * 0.1;
      var lng = t.lng + offset * 0.1;

      var marker = L.circleMarker([lat, lng], {
        radius: 7,
        fillColor: COLORS[t.type] || '#555',
        color: '#ffffff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.9
      }).addTo(map);

      var html =
        '<div class="talks-map__popup">' +
          '<span class="talks-map__popup-tag talks-map__popup-tag--' + t.type + '">' + t.type.charAt(0).toUpperCase() + t.type.slice(1) + '</span>' +
          '<div class="talks-map__popup-title">' + t.title + '</div>' +
          '<div class="talks-map__popup-venue">' + t.venue + '</div>' +
          '<div class="talks-map__popup-meta">' + t.city + ' · ' + t.date + '</div>' +
        '</div>';

      marker.bindPopup(html, { closeButton: true, maxWidth: 280 });
      bounds.extend([lat, lng]);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 4 });
    }

    // Click map to enable scroll-zoom (avoid trapping page scroll by default)
    el.addEventListener('click', function () { map.scrollWheelZoom.enable(); });
    el.addEventListener('mouseleave', function () { map.scrollWheelZoom.disable(); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
