document.addEventListener("DOMContentLoaded", function () {
  (function () {
    const canvas = document.getElementById("dot-canvas");
    const ctx = canvas.getContext("2d");
    let dots = [];
    let W, H;

    const YELLOW = "rgba(245,216,74,";
    const WHITE = "rgba(240,234,220,";

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      init();
    }

    function init() {
      dots = [];

      const clusters = [
        {
          cx: W * 0.25,
          cy: H * 0.04,
          spread: W * 0.28,
          count: 80,
          yellow: 0.15,
        },
        {
          cx: W * 0.72,
          cy: H * 0.06,
          spread: W * 0.22,
          count: 60,
          yellow: 0.1,
        },
        {
          cx: W * 0.2,
          cy: H * 0.96,
          spread: W * 0.28,
          count: 100,
          yellow: 0.5,
        },
        {
          cx: W * 0.65,
          cy: H * 0.94,
          spread: W * 0.32,
          count: 110,
          yellow: 0.45,
        },
      ];

      clusters.forEach(({ cx, cy, spread, count, yellow: yChance }) => {
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.pow(Math.random(), 0.6) * spread;
          dots.push({
            x: cx + Math.cos(angle) * dist,
            y: cy + Math.sin(angle) * dist * 0.45,
            r: 1.8 + Math.random() * 3.8,
            vx: (Math.random() - 0.5) * 0.08,
            vy: (Math.random() - 0.5) * 0.08,
            yellow: Math.random() < yChance,
            alpha: 0.5 + Math.random() * 0.45,
            phase: Math.random() * Math.PI * 2,
            speed: 0.004 + Math.random() * 0.008,
          });
        }
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -20) d.x = W + 20;
        if (d.x > W + 20) d.x = -20;
        if (d.y < -20) d.y = H + 20;
        if (d.y > H + 20) d.y = -20;

        const pulse = d.alpha * (0.78 + 0.22 * Math.sin(t * d.speed + d.phase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = (d.yellow ? YELLOW : WHITE) + pulse.toFixed(2) + ")";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(draw);
  })();

  /* ── SCROLL REVEAL ── */
  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
});
