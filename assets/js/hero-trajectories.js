/* Hero car-following animation.
 * Vehicles on parallel lanes follow the car ahead using an optimal-velocity
 * model on a ring, which spontaneously forms stop-and-go clusters — a subtle
 * nod to the traffic-flow research behind this site. Pauses when off-screen,
 * is theme-aware, couples gently to scrolling, and honours reduced motion by
 * drawing a single static frame instead of animating. */
(function () {
  if (typeof window === "undefined") return;

  var canvas = document.querySelector(".hero-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var dpr = Math.max(1, window.devicePixelRatio || 1);
  var width = 0, height = 0;
  var lanes = [];
  var running = false, rafId = null, lastTs = 0;
  var holdUntil = 0, cueTimer = null;
  var boost = 1, lastScrollY = window.scrollY || 0;

  // Optimal-velocity-model parameters (pixels, seconds).
  var V0 = 70;     // free-flow speed
  var S0 = 11;     // jam gap (vehicles stop when closer than this)
  var WS = 17;     // sensitivity width of the velocity function
  var KAPPA = 1.9; // responsiveness
  var VEH = 5;     // vehicle length

  function isDark() {
    return document.documentElement.classList.contains("dark-mode");
  }
  function palette() {
    return isDark()
      ? ["#e06a75", "#f0a0a8", "#ffb199", "#c77dff", "#8ab4f8"]
      : ["#c0392b", "#d46a5f", "#b5651d", "#7d5ba6", "#3a6ea5"];
  }

  // Optimal velocity: ~0 near the jam gap, saturating to V0 for large gaps.
  function vOpt(s) {
    var t0 = Math.tanh(S0 / WS);
    return (V0 * (Math.tanh((s - S0) / WS) + t0)) / (1 + t0);
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
    if (reduceMotion) { warmUp(6); render(true); }
  }

  function seed() {
    lanes = [];
    var colors = palette();
    var nLanes = 3;
    for (var li = 0; li < nLanes; li++) {
      var laneY = height * ((li + 0.65) / (nLanes + 0.3));
      var m = Math.max(5, Math.round(width / 44));
      var spacing = width / m;
      var veh = [];
      for (var j = 0; j < m; j++) {
        veh.push({
          x: (spacing * j + (Math.random() * 6 - 3) + width) % width,
          v: V0 * (0.35 + Math.random() * 0.2),
          color: colors[(li * 2 + j) % colors.length],
          size: 1.6 + Math.random() * 0.9,
          trail: []
        });
      }
      // Seed an instability so stop-and-go waves emerge.
      veh[(Math.random() * m) | 0].v = 2;
      lanes.push({ y: laneY, veh: veh });
    }
  }

  function simulate(dt) {
    if (dt <= 0) return;
    var braking = performance.now() < holdUntil;
    for (var li = 0; li < lanes.length; li++) {
      var arr = lanes[li].veh;
      var n = arr.length;
      var next = [];
      // Retain each lane's cyclic vehicle order and read one shared time slice.
      for (var i = 0; i < n; i++) {
        var me = arr[i];
        var lead = arr[(i + 1) % n];
        var centerGap = (lead.x - me.x + width) % width;
        var s = Math.max(0, centerGap - VEH);
        var velocity = Math.max(0, me.v + KAPPA * (vOpt(s) * boost - me.v) * dt);
        if (me.demoBrake && braking) velocity = Math.min(velocity, 1);
        // Reserve room for the rendered heads, including their perturbation highlight.
        // Even if the leader stops, this step cannot overtake its old position.
        var separation = Math.max(VEH, me.size + lead.size + 6.1);
        velocity = Math.min(velocity, Math.max(0, centerGap - separation) / dt);
        next.push({ v: velocity, x: (me.x + velocity * dt) % width });
      }
      for (var j = 0; j < n; j++) {
        arr[j].v = next[j].v;
        arr[j].x = next[j].x;
      }
    }
  }

  // Advance the simulation a few seconds without drawing (for the static frame).
  function warmUp(seconds) {
    var steps = Math.round(seconds / 0.03);
    for (var k = 0; k < steps; k++) {
      simulate(0.03);
      for (var li = 0; li < lanes.length; li++) {
        var arr = lanes[li].veh;
        for (var i = 0; i < arr.length; i++) pushTrail(arr[i]);
      }
    }
  }

  function pushTrail(v) {
    v.trail.push(v.x);
    if (v.trail.length > 26) v.trail.shift();
  }

  function render(clearFirst) {
    if (clearFirst) ctx.clearRect(0, 0, width, height);
    for (var li = 0; li < lanes.length; li++) {
      var laneY = lanes[li].y;
      var arr = lanes[li].veh;
      for (var i = 0; i < arr.length; i++) {
        var v = arr[i];
        // Trail (skip the segment where x wraps around the ring).
        if (v.trail.length > 1) {
          ctx.strokeStyle = v.color;
          ctx.lineWidth = v.size * 0.9;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          for (var k = 1; k < v.trail.length; k++) {
            if (Math.abs(v.trail[k] - v.trail[k - 1]) > width * 0.5) continue;
            ctx.globalAlpha = (k / v.trail.length) * 0.5;
            ctx.beginPath();
            ctx.moveTo(v.trail[k - 1], laneY);
            ctx.lineTo(v.trail[k], laneY);
            ctx.stroke();
          }
        }
        // Head; brighter when moving fast, dim when in a jam (stop-and-go cue).
        ctx.globalAlpha = 0.5 + 0.45 * Math.min(1, v.v / V0);
        ctx.fillStyle = v.color;
        ctx.beginPath();
        ctx.arc(v.x, laneY, v.size + (v.demoBrake && performance.now() < holdUntil ? 2.8 : 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  function step(ts) {
    if (!running) return;
    var dt = Math.min(0.045, (ts - lastTs) / 1000 || 0.016);
    lastTs = ts;
    boost += (1 - boost) * Math.min(1, dt * 2.2);

    simulate(dt);
    for (var li = 0; li < lanes.length; li++) {
      var arr = lanes[li].veh;
      for (var i = 0; i < arr.length; i++) pushTrail(arr[i]);
    }
    // Trails already have bounded history and fading opacity; do not retain old heads.
    render(true);
    rafId = window.requestAnimationFrame(step);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    lastTs = performance.now();
    rafId = window.requestAnimationFrame(step);
  }
  function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      },
      { rootMargin: "50px" }
    );
    io.observe(canvas);
  } else if (!reduceMotion) {
    start();
  }

  window.addEventListener("scroll", function () {
    var y = window.scrollY || 0;
    var delta = Math.abs(y - lastScrollY);
    lastScrollY = y;
    boost = Math.min(2.6, boost + delta * 0.010);
  }, { passive: true });

  // Re-seed colours on theme toggle.
  var mo = new MutationObserver(function () {
    var colors = palette();
    for (var li = 0; li < lanes.length; li++) {
      var arr = lanes[li].veh;
      for (var i = 0; i < arr.length; i++) arr[i].color = colors[(li * 2 + i) % colors.length];
    }
    if (reduceMotion) render(true);
  });
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  window.addEventListener("resize", function () {
    window.clearTimeout(canvas.__rszT);
    canvas.__rszT = window.setTimeout(resize, 120);
  });

  if (canvas.parentElement) {
    canvas.parentElement.style.minHeight =
      canvas.parentElement.style.minHeight || "96px";
  }
  resize();

  var perturb = document.getElementById('hero-perturb');
  var reset = document.getElementById('hero-reset');
  var status = document.getElementById('hero-feedback');
  var wrap = canvas.parentElement;
  function clearCue() {
    window.clearTimeout(cueTimer);
    holdUntil = 0;
    lanes.forEach(function (lane) {
      lane.veh.forEach(function (v) { v.demoBrake = false; });
    });
    wrap.classList.remove('hero-is-perturbed');
  }
  perturb.addEventListener('click', function () {
    clearCue();
    holdUntil = performance.now() + 900;
    lanes.forEach(function (lane) {
      lane.veh.forEach(function (v) { v.demoBrake = false; });
      var target = lane.veh.reduce(function (a, b) {
        return Math.abs(a.x - width * 0.76) < Math.abs(b.x - width * 0.76) ? a : b;
      });
      target.v = 0; target.demoBrake = true;
    });
    wrap.classList.add('hero-is-perturbed');
    status.textContent = reduceMotion ? 'A slowdown, shown as a still frame.' : 'A brief slowdown. Watch the following dots.';
    if (reduceMotion) { warmUp(0.6); render(true); }
    else {
      render(true);
      cueTimer = window.setTimeout(function () {
        clearCue();
        status.textContent = 'Braking released; traffic is responding.';
      }, 1200);
    }
  });
  reset.addEventListener('click', function () {
    clearCue(); boost = 1; seed();
    if (reduceMotion) warmUp(6);
    render(true);
    status.textContent = 'Animation reset.';
  });
  if (reduceMotion) status.textContent = 'Reduced motion: static preview.';

})();
