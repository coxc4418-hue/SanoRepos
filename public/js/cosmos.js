// SanoRepos — Sistema orbital del inicio (canvas 2D con proyección 3D).
// Cada software del catálogo es un planeta que gira alrededor del núcleo Sano.
// startCosmos(canvas, items, { onHover(item, x, y), onClick(item) })

const TAU = Math.PI * 2;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const rgba = ([r, g, b], a) => `rgba(${r},${g},${b},${a})`;

function loadImg(src) {
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
  return img;
}

// Ajusta el canvas a su tamaño en pantalla (con densidad de píxeles limitada)
function fit(canvas, ctx) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const { width, height } = canvas.getBoundingClientRect();
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { w: width, h: height };
}

// Corre `frame` solo mientras el canvas está visible y la pestaña activa
function loop(canvas, frame) {
  let visible = true, raf = 0, last = performance.now();
  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, .05);
    last = now;
    frame(dt, now / 1000);
    raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    cancelAnimationFrame(raf);
    if (visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); }
  };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }).observe(canvas);
  document.addEventListener('visibilitychange', sync);
  sync();
}

export function startCosmos(canvas, items, { onHover, onClick } = {}) {
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, stars = [], streams = [], shooting = null;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0, px: -1, py: -1 };
  let hovered = null, zones = [];
  // rectángulos (texto del hero, menú) donde los planetas se atenúan para no tapar la lectura
  function measureZones() {
    const c = canvas.getBoundingClientRect();
    zones = ['.hero-inner', '.nav'].map((s) => document.querySelector(s)?.getBoundingClientRect()).filter(Boolean)
      .map((r) => ({ l: r.left - c.left - 20, r: r.right - c.left + 20, t: r.top - c.top - 10, b: r.bottom - c.top + 10 }));
  }
  const inZone = (x, y) => zones.some((z) => x > z.l && x < z.r && y > z.t && y < z.b);
  const speed = reduced ? .15 : 1;

  const planets = items.map((it, i) => ({
    it,
    rgb: hexToRgb(it.color[0]),
    rgb2: hexToRgb(it.color[1]),
    img: loadImg(`/assets/${it.id}/logo.svg`),
    ring: .5 + (i % 3) * .25 + (i > 2 ? .08 : 0),   // radio relativo de la órbita
    a: (i / items.length) * TAU,                     // ángulo inicial repartido
    v: (.16 - (i % 3) * .035) * (i % 2 ? 1 : 1.12), // velocidad
    roll: (i % 3 - 1) * .22,                         // giro del plano de la órbita
    size: 1, fade: 1,
    sx: 0, sy: 0, sz: 0, sr: 0
  }));

  function resize() {
    ({ w: W, h: H } = fit(canvas, ctx));
    const count = Math.min(420, Math.round((W * H) / 3200));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      z: Math.random() * .9 + .1, tw: Math.random() * TAU,
      hue: Math.random() < .15 ? (Math.random() < .5 ? 190 : 280) : 230
    }));
  }
  resize();
  new ResizeObserver(() => { resize(); measureZones(); }).observe(canvas);
  setTimeout(measureZones, 600);
  addEventListener('scroll', measureZones, { passive: true });

  // Geometría: radio base según pantalla; centro un poco más arriba en teléfonos
  const base = () => Math.min(W * .47, H * .62, 620);
  const center = () => [W / 2, H * (W < 640 ? .42 : .47)];
  const tilt = () => 1.18 + mouse.y * .12;

  function project(r, ang, roll) {
    const x0 = Math.cos(ang) * r, z0 = Math.sin(ang) * r;
    const t = tilt();
    let y = z0 * Math.cos(t);
    let z = z0 * Math.sin(t);
    // giro del plano de la órbita sobre el eje de visión + leve paralaje del ratón
    const c = Math.cos(roll + mouse.x * .1), s = Math.sin(roll + mouse.x * .1);
    const x = x0 * c - y * s;
    y = x0 * s + y * c;
    const f = 900, k = f / (f + z);
    const [cx, cy] = center();
    return [cx + x * k, cy + y * k, z, k];
  }

  function drawStars(t) {
    for (const s of stars) {
      const px = s.x - mouse.x * 30 * s.z, py = s.y - mouse.y * 20 * s.z;
      const a = (.35 + .65 * Math.abs(Math.sin(t * (.6 + s.z) + s.tw))) * s.z;
      ctx.fillStyle = `hsla(${s.hue},90%,85%,${a})`;
      const r = s.z * 1.5;
      ctx.fillRect(px, py, r, r);
    }
  }

  function drawShooting(dt) {
    if (!shooting && Math.random() < dt * .25 && !reduced) {
      shooting = { x: Math.random() * W, y: Math.random() * H * .5, vx: -500 - Math.random() * 300, vy: 220 + Math.random() * 120, life: 1 };
    }
    if (!shooting) return;
    const s = shooting;
    s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt * 1.2;
    const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * .18, s.y - s.vy * .18);
    g.addColorStop(0, `rgba(255,255,255,${s.life})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * .18, s.y - s.vy * .18); ctx.stroke();
    if (s.life <= 0) shooting = null;
  }

  function drawOrbit(p, R) {
    const r = p.ring * R;
    ctx.beginPath();
    for (let i = 0; i <= 96; i++) {
      const [x, y] = project(r, (i / 96) * TAU, p.roll);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.strokeStyle = rgba(p.rgb, p === hovered ? .45 : .12);
    ctx.lineWidth = p === hovered ? 1.4 : 1;
    ctx.stroke();
  }

  function drawCore(t, R) {
    const [cx, cy] = center();
    const pulse = 1 + Math.sin(t * 1.6) * .05;
    const r = Math.max(20, R * .06) * pulse;
    ctx.globalAlpha = .55;
    let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 5);
    g.addColorStop(0, 'rgba(167,139,250,.35)');
    g.addColorStop(.4, 'rgba(34,211,238,.08)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, r * 5, 0, TAU); ctx.fill();
    g = ctx.createRadialGradient(cx - r * .3, cy - r * .35, r * .1, cx, cy, r);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(.45, '#a5f3fc');
    g.addColorStop(1, '#6366f1');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.fill();
    // anillos de pulso
    for (let i = 0; i < 3; i++) {
      const k = ((t * .35 + i / 3) % 1);
      ctx.strokeStyle = `rgba(165,243,252,${(1 - k) * .35})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, r * (1 + k * 3.5), 0, TAU); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Pulsos de datos que viajan del núcleo a cada planeta
  function drawStreams(dt) {
    const [cx, cy] = center();
    if (Math.random() < dt * 5 && !reduced) {
      const p = planets[(Math.random() * planets.length) | 0];
      streams.push({ p, k: 0, back: Math.random() < .5 });
    }
    for (const p of planets) {
      const g = ctx.createLinearGradient(cx, cy, p.sx, p.sy);
      g.addColorStop(0, 'rgba(165,243,252,0)');
      g.addColorStop(1, rgba(p.rgb, p === hovered ? .5 : .14 * (p.sz < 0 ? 1.4 : .6)));
      ctx.strokeStyle = g; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.sx, p.sy); ctx.stroke();
    }
    streams = streams.filter((s) => {
      s.k += dt * .9;
      const k = s.back ? 1 - s.k : s.k;
      const x = cx + (s.p.sx - cx) * k, y = cy + (s.p.sy - cy) * k;
      ctx.fillStyle = rgba(s.p.rgb, .9 * Math.sin(Math.PI * Math.min(s.k, 1)));
      ctx.beginPath(); ctx.arc(x, y, 2.2, 0, TAU); ctx.fill();
      return s.k < 1;
    });
  }

  function drawPlanet(p, t) {
    const hov = p === hovered;
    p.size += ((hov ? 1.25 : 1) - p.size) * .15;
    const r = p.sr * p.size;
    const { sx: x, sy: y } = p;
    const depthA = p.sz > 0 ? .55 : 1; // los planetas de atrás se ven más tenues
    p.fade += ((hov ? 1 : inZone(x, y) ? .2 : 1) - p.fade) * .08;
    ctx.globalAlpha = depthA * p.fade;
    // halo
    let g = ctx.createRadialGradient(x, y, r * .6, x, y, r * 2.6);
    g.addColorStop(0, rgba(p.rgb, .35));
    g.addColorStop(1, rgba(p.rgb, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * 2.6, 0, TAU); ctx.fill();
    // anillo orbital del planeta
    ctx.save();
    ctx.translate(x, y); ctx.rotate(-.35 + p.roll);
    ctx.strokeStyle = rgba(p.rgb, .55);
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.65, r * .45, 0, Math.PI, TAU); ctx.stroke();
    ctx.restore();
    // esfera
    g = ctx.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r);
    g.addColorStop(0, rgba(p.rgb.map((c) => Math.min(255, c + 70)), 1));
    g.addColorStop(.55, rgba(p.rgb, 1));
    g.addColorStop(1, rgba(p.rgb2, 1));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    // logo del software dentro del planeta
    if (p.img.complete && p.img.naturalWidth) {
      ctx.save();
      ctx.beginPath(); ctx.arc(x, y, r * .92, 0, TAU); ctx.clip();
      const s = r * 1.84;
      ctx.drawImage(p.img, x - s / 2, y - s / 2, s, s);
      ctx.restore();
    }
    // brillo
    g = ctx.createRadialGradient(x - r * .4, y - r * .5, 0, x - r * .4, y - r * .5, r * .9);
    g.addColorStop(0, 'rgba(255,255,255,.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    // frente de la línea del anillo
    ctx.save();
    ctx.translate(x, y); ctx.rotate(-.35 + p.roll);
    ctx.strokeStyle = rgba(p.rgb.map((c) => Math.min(255, c + 60)), .85);
    ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.ellipse(0, 0, r * 1.65, r * .45, 0, 0, Math.PI); ctx.stroke();
    ctx.restore();
    if (hov) {
      ctx.strokeStyle = 'rgba(255,255,255,.8)';
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -t * 20;
      ctx.beginPath(); ctx.arc(x, y, r + 10, 0, TAU); ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.globalAlpha = 1;
  }

  function frame(dt, t) {
    mouse.x += (mouse.tx - mouse.x) * .05;
    mouse.y += (mouse.ty - mouse.y) * .05;
    ctx.clearRect(0, 0, W, H);
    drawStars(t);
    drawShooting(dt);
    const R = base();
    const planetR = Math.max(17, Math.min(34, R * .085));
    for (const p of planets) {
      if (p !== hovered) p.a += p.v * dt * speed;
      const [x, y, z, k] = project(p.ring * R, p.a, p.roll);
      p.sx = x; p.sy = y; p.sz = z; p.sr = planetR * k;
    }
    for (const p of planets) drawOrbit(p, R);
    drawStreams(dt);
    const sorted = [...planets].sort((a, b) => b.sz - a.sz);
    for (const p of sorted) if (p.sz > 0) drawPlanet(p, t);
    drawCore(t, R);
    for (const p of sorted) if (p.sz <= 0) drawPlanet(p, t);
    if (hovered) onHover?.(hovered.it, hovered.sx, hovered.sy - hovered.sr * hovered.size);
  }

  function hit(px, py) {
    let best = null;
    for (const p of planets) {
      const d = Math.hypot(px - p.sx, py - p.sy);
      if (d < p.sr * 1.5 + 6 && (!best || p.sz < best.sz)) best = p;
    }
    return best;
  }

  function pointer(e) {
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left, py = e.clientY - rect.top;
    mouse.tx = (px / W - .5) * 2;
    mouse.ty = (py / H - .5) * 2;
    const p = hit(px, py);
    if (p !== hovered) {
      hovered = p;
      canvas.style.cursor = p ? 'pointer' : 'default';
      if (!p) onHover?.(null);
    }
  }
  // El texto del hero queda encima del canvas: escuchamos en la sección completa
  const host = canvas.parentElement;
  host.addEventListener('pointermove', pointer);
  host.addEventListener('pointerleave', () => { mouse.tx = mouse.ty = 0; hovered = null; onHover?.(null); });
  host.addEventListener('click', (e) => {
    if (e.target.closest('a, button')) return;
    const rect = canvas.getBoundingClientRect();
    const p = hit(e.clientX - rect.left, e.clientY - rect.top);
    if (p) onClick?.(p.it);
  });
  host.addEventListener('pointerdown', (e) => {
    // en pantallas táctiles no hay "hover": marcamos el planeta al tocar
    if (e.pointerType !== 'mouse') pointer(e);
  });

  loop(canvas, frame);
  return { setHover(id) { hovered = planets.find((p) => p.it.id === id) || null; } };
}

// Fondo de ondas de partículas para la tarjeta de contacto
export function startWaves(canvas, colors) {
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  const resize = () => ({ w: W, h: H } = fit(canvas, ctx));
  resize();
  new ResizeObserver(resize).observe(canvas);
  const rgbs = colors.map(hexToRgb);
  loop(canvas, (dt, t) => {
    ctx.clearRect(0, 0, W, H);
    const cols = Math.ceil(W / 22);
    rgbs.forEach((rgb, li) => {
      for (let i = 0; i <= cols; i++) {
        const x = i * 22;
        const y = H * .5 + Math.sin(i * .22 + t * (.6 + li * .12) + li) * H * .18 + Math.sin(i * .07 - t * .4 + li * 2) * H * .12;
        const a = .25 + .35 * Math.sin(i * .3 + t * 2 + li);
        ctx.fillStyle = rgba(rgb, Math.max(.05, a) * .8);
        ctx.beginPath(); ctx.arc(x, y, 1.6, 0, TAU); ctx.fill();
      }
    });
  });
}
