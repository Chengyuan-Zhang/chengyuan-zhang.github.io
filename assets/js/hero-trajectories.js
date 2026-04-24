/* Hero multi-vehicle trajectory animation.
 * Subtle, research-themed background: a handful of "vehicles" flow across
 * parallel lanes while leaving fading trails. Pauses when off-screen and
 * briefly accelerates in response to user scrolling. Honors reduced-motion. */
(function () {
  if (typeof window === "undefined") return;
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  var canvas = document.querySelector(".hero-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var dpr = Math.max(1, window.devicePixelRatio || 1);
  var width = 0;
  var height = 0;
  var vehicles = [];
  var running = false;
  var rafId = null;
  var lastTs = 0;
  var scrollBoost = 1;
  var lastScrollY = window.scrollY || 0;

  function isDark() {
    return document.documentElement.classList.contains("dark-mode");
  }

  function palette() {
    // Accent-red-centered, low saturation, theme-aware
    return isDark()
      ? ["#e06a75", "#f0a0a8", "#ffb199", "#c77dff", "#8ab4f8"]
      : ["#c0392b", "#d46a5f", "#b5651d", "#7d5ba6", "#3a6ea5"];
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    vehicles = [];
    var colors = palette();
    var lanes = 4;
    var perLane = 3;
    for (var i = 0; i < lanes; i++) {
      var laneY = height * ((i + 0.5) / lanes);
      // gentle sinusoidal lane so trajectories feel non-trivial
      var amp = 4 + Math.random() * 6;
      var freq = 0.012 + Math.random() * 0.01;
      var phase = Math.random() * Math.PI * 2;
      for (var j = 0; j < perLane; j++) {
        vehicles.push({
          x: (width / perLane) * j + Math.random() * 40,
          baseY: laneY,
          amp: amp,
          freq: freq,
          phase: phase + j * 0.8,
          speed: 18 + Math.random() * 22, // px / sec baseline
          color: colors[(i * perLane + j) % colors.length],
          trail: [],
          size: 1.6 + Math.random() * 1.1,
        });
      }
    }
  }

  function step(ts) {
    if (!running) return;
    var dt = Math.min(0.05, (ts - lastTs) / 1000 || 0.016);
    lastTs = ts;

    // Exponentially decay the scroll boost back to 1
    scrollBoost += (1 - scrollBoost) * Math.min(1, dt * 2.2);

    // Fade previous frame instead of clearing for a soft trail look
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "source-over";

    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.x += v.speed * scrollBoost * dt;
      if (v.x > width + 20) v.x = -20;

      var y = v.baseY + Math.sin(v.x * v.freq + v.phase) * v.amp;

      v.trail.push([v.x, y]);
      if (v.trail.length > 28) v.trail.shift();

      // Draw trail
      if (v.trail.length > 1) {
        ctx.strokeStyle = v.color;
        ctx.lineWidth = v.size * 0.9;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (var k = 1; k < v.trail.length; k++) {
          var a = k / v.trail.length; // 0..1
          ctx.globalAlpha = a * 0.55;
          ctx.beginPath();
          ctx.moveTo(v.trail[k - 1][0], v.trail[k - 1][1]);
          ctx.lineTo(v.trail[k][0], v.trail[k][1]);
          ctx.stroke();
        }
      }

      // Draw vehicle head
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = v.color;
      ctx.beginPath();
      ctx.arc(v.x, y, v.size + 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    rafId = window.requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    lastTs = performance.now();
    rafId = window.requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  // Pause when the hero is offscreen
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) start();
          else stop();
        });
      },
      { rootMargin: "50px" }
    );
    io.observe(canvas);
  } else {
    start();
  }

  // Scroll coupling: briefly boost speed on scroll
  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY || 0;
      var delta = Math.abs(y - lastScrollY);
      lastScrollY = y;
      // cap boost so it stays subtle
      scrollBoost = Math.min(3.2, scrollBoost + delta * 0.012);
    },
    { passive: true }
  );

  // Theme toggle re-seed (pick up new palette)
  var mo = new MutationObserver(function () {
    var colors = palette();
    for (var i = 0; i < vehicles.length; i++) {
      vehicles[i].color = colors[i % colors.length];
    }
  });
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("resize", function () {
    // debounce-ish
    window.clearTimeout(canvas.__rszT);
    canvas.__rszT = window.setTimeout(resize, 120);
  });

  // Ensure a minimum height so the canvas has room even before content paints
  if (canvas.parentElement) {
    canvas.parentElement.style.minHeight =
      canvas.parentElement.style.minHeight || "96px";
  }
  resize();
})();
