/*
 * 404 page: a single vehicle wandering off its lane.
 *
 * This lived inline in _pages/404.md until the HTML compressor in
 * _layouts/compress.html flattened the newlines, at which point the first //
 * comment swallowed the rest of the file and the page threw
 * "SyntaxError: Unexpected end of input". Keeping it in its own file avoids
 * that class of failure entirely.
 */
(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var canvas = document.querySelector(".not-found__canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var dpr = Math.max(1, window.devicePixelRatio || 1);
  var W = 0, H = 0;

  function isDark() { return document.documentElement.classList.contains("dark-mode"); }

  function resize() {
    var r = canvas.getBoundingClientRect();
    W = Math.max(1, Math.floor(r.width));
    H = Math.max(1, Math.floor(r.height));
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", function () {
    clearTimeout(canvas.__rs);
    canvas.__rs = setTimeout(resize, 120);
  });

  // A single "lost" vehicle: follows a chaotic trajectory driven by layered
  // sines + perturbations, wrapping when it wanders off the stage.
  var t = 0;
  var trail = [];
  var MAX_TRAIL = 140;

  function step(ts) {
    var dt = 0.016;
    t += dt;

    var laneColor = isDark() ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
    var vehColor = isDark() ? "#e06a75" : "#c0392b";
    var bgFade = isDark() ? "rgba(18,20,26,0.12)" : "rgba(255,255,255,0.16)";

    // Soft fade for persistence
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = bgFade;
    ctx.fillRect(0, 0, W, H);

    // Faint lane dashes across the stage
    ctx.strokeStyle = laneColor;
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 10]);
    for (var i = 1; i < 4; i++) {
      var y = (H / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Position: Lissajous-ish with a drift + occasional "glitch"
    var cx = W / 2, cy = H / 2;
    var ax = W * 0.42, ay = H * 0.32;
    var glitch = Math.sin(t * 0.9) > 0.985 ? (Math.random() - 0.5) * 30 : 0;
    var x = cx + ax * Math.sin(t * 0.55) * Math.cos(t * 0.18) + glitch;
    var y = cy + ay * Math.sin(t * 0.42 + 1.2) + glitch * 0.6;

    trail.push([x, y]);
    if (trail.length > MAX_TRAIL) trail.shift();

    // Draw trail
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (var k = 1; k < trail.length; k++) {
      var a = k / trail.length;
      ctx.globalAlpha = a * 0.55;
      ctx.strokeStyle = vehColor;
      ctx.lineWidth = 1.2 + a * 1.4;
      ctx.beginPath();
      ctx.moveTo(trail[k - 1][0], trail[k - 1][1]);
      ctx.lineTo(trail[k][0], trail[k][1]);
      ctx.stroke();
    }

    // Vehicle head (pointing along direction)
    ctx.globalAlpha = 1;
    var prev = trail[trail.length - 2] || [x, y];
    var ang = Math.atan2(y - prev[1], x - prev[0]);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.fillStyle = vehColor;
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-6, 4);
    ctx.lineTo(-6, -4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();
