// SanoRepos — arma el sitio a partir de catalog.js
import { CATALOG, COMMON, COMPARE_COLS, WHATSAPP } from './catalog.js?v=20261102b';
import { startCosmos, startWaves } from './cosmos.js?v=20261102b';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const fullName = (it) => it.name.join('');
const nameHtml = (it) => `${esc(it.name[0])}<em>${esc(it.name[1])}</em>`;
const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
const mins = (m) => `${Math.floor(m)}:${String(Math.round((m % 1) * 60)).padStart(2, '0')} min`;
// texto oscuro sobre colores claros (ej. el verde lima de SanoGym), blanco sobre los demás
const ink = (hex) => {
  const n = parseInt(hex.slice(1), 16), [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > .75 ? '#0b0d1f' : '#fff';
};
const cssVars = (it) => `--pc:${it.color[0]};--pc2:${it.color[1]};--ink:${ink(it.color[0])}`;
const LIVE = CATALOG.filter((it) => it.status !== 'pronto');

// ---------- Analítica (Firebase) — si falla o se bloquea, el sitio sigue igual ----------
let logEvent = () => {};
(async () => {
  try {
    const [{ initializeApp }, an] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js')
    ]);
    const app = initializeApp({
      apiKey: 'AIzaSyD8ttpKfd9OZRfgg5G2iGCwIyfi2FpaPns',
      authDomain: 'sanorepos.firebaseapp.com',
      projectId: 'sanorepos',
      storageBucket: 'sanorepos.firebasestorage.app',
      messagingSenderId: '882377285263',
      appId: '1:882377285263:web:0a16a8ad1e197ec2e61afa',
      measurementId: 'G-CBH09SZ0V4'
    });
    if (await an.isSupported()) {
      const a = an.getAnalytics(app);
      logEvent = (name, params) => an.logEvent(a, name, params);
    }
  } catch { /* sin analítica */ }
})();
const track = (name, params) => { try { logEvent(name, params); } catch { /* nada */ } };

// ---------- Iconos (trazos estilo línea) ----------
const ICONS = {
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  table: '<path d="M3 9h18M5 9v11M19 9v11M7 9V5h10v4"/>',
  chef: '<path d="M6 14a4 4 0 1 1 2-7.5 4 4 0 0 1 8 0A4 4 0 1 1 18 14v6H6z"/><path d="M6 17h12"/>',
  flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h11L21 7H6"/>',
  box: '<path d="m21 8-9-5-9 5v8l9 5 9-5z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
  book: '<path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 17a3 3 0 0 1 3-3h11M8 8h6"/>',
  building: '<path d="M4 21V5l8-3v19M12 8h8v13M2 21h20M8 7v.01M8 11v.01M8 15v.01M16 12v.01M16 16v.01"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
  kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M5 7h2M11 7h2M17 7h2M11 11h2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0M16 4a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 4 7"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M8 14h3"/>',
  heart: '<path d="M20.8 5.6a5.5 5.5 0 0 0-8.8-1.3 5.5 5.5 0 0 0-8.8 6.6L12 21l8.8-10.1a5.5 5.5 0 0 0 0-5.3z"/><path d="M3 12h4l2-3 3 6 2-3h7"/>',
  pill: '<rect x="2" y="8" width="20" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="m8.5 8.5 7 7"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M17 21h4v-4M14 18v3"/>',
  whatsapp: '<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"/><path d="M9 9.5c.4 2.3 2.2 4.1 4.5 4.5"/>',
  tooth: '<path d="M7 3c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7 .5 3 1 6.5 3 6.5s2-4 4-4 2 4 4 4 2.5-3.5 3-6.5c.5-2.5 2-4 2-7C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
  dumbbell: '<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/>',
  chair: '<path d="M7 3h10v8H7zM5 11h14v4H5zM7 15v6M17 15v6"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/>',
  download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
  cloud: '<path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 10a4 4 0 0 1-1 8z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  video: '<rect x="2" y="5" width="14" height="14" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
};
const ico = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.check}</svg>`;

// ---------- Cinta de rubros ----------
function renderMarquee() {
  const items = LIVE.flatMap((it) => it.rubros.map((r) => `<span><i style="background:${it.color[0]};box-shadow:0 0 10px ${it.color[0]}"></i>${esc(r)}</span>`));
  $('#marquee').innerHTML = items.join('') + items.join('');
}

// ---------- Buscador ----------
const QUICK = [
  ['Restaurante', 'sano-restaurant'], ['Pizzería', 'sano-restaurant'], ['Bodega', 'sanogestion'], ['Abasto', 'sanogestion'],
  ['Minimarket', 'sanogestion'], ['Taller de celulares', 'sano-tecnico'], ['Consultorio médico', 'sano-doctor'],
  ['Dentista', 'sano-dental'], ['Ortodoncia', 'sano-dental'], ['Gimnasio', 'sano-gym'], ['CrossFit', 'sano-gym'], ['Barbería', 'sano-cortes'], ['Peluquería', 'sano-cortes'], ['Cafetería', 'sano-restaurant']
];

function score(it, q) {
  const tokens = norm(q).split(/[\s,.;]+/).filter((t) => t.length > 1);
  if (!tokens.length) return 0;
  const name = norm(it.name.join(' ')), rub = norm(it.rubros.join(' ')), kw = norm(it.keywords), tag = norm(it.tagline + ' ' + it.category);
  let s = 0;
  for (const t of tokens) {
    const stem = t.length > 4 ? t.slice(0, -1) : t; // "pizzerias" ~ "pizzeria"
    if (name.includes(stem)) s += 6;
    if (rub.includes(stem)) s += 5;
    else if (kw.split(' ').some((k) => k.startsWith(stem) || (stem.length > 4 && k.includes(stem)))) s += 4;
    else if (tag.includes(stem)) s += 2;
  }
  return s / tokens.length;
}

function renderMatch(q) {
  const box = $('#match');
  if (!q.trim()) { box.innerHTML = ''; return; }
  const ranked = LIVE.map((it) => ({ it, s: score(it, q) })).filter((r) => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 3);
  if (!ranked.length) {
    box.innerHTML = `<p class="match-empty">Todavía no tenemos un software para “${esc(q)}”. <a href="${waLink(`Hola, tengo un negocio de ${q} y me interesa un software. ¿Pueden hacerlo?`)}" target="_blank" rel="noopener">Cuéntanos tu negocio por WhatsApp</a> y lo construimos contigo.</p>`;
    return;
  }
  const top = ranked[0].s;
  box.innerHTML = ranked.map(({ it, s }, i) => {
    const pct = Math.round(Math.min(99, 62 + (s / Math.max(top, 6)) * 37 - i * 6));
    return `<div class="match-card" style="${cssVars(it)}" data-open="${it.id}" role="button" tabindex="0" aria-label="Ver ${esc(fullName(it))}">
      <div class="match-ring" data-pct="${pct}"><img src="/assets/${it.id}/logo.svg" alt=""></div>
      <div><h3>${nameHtml(it)}<small>${pct}% ideal</small></h3><p>${esc(it.tagline)}</p></div>
      <div class="match-actions">
        <button class="btn btn-ghost" data-video="${it.id}">${ico('play')} Video</button>
        <button class="btn btn-pc" data-open="${it.id}">Ver ficha</button>
      </div></div>`;
  }).join('');
  // anima el anillo de porcentaje
  $$('.match-ring', box).forEach((r) => {
    const target = +r.dataset.pct; let p = 0;
    const step = () => { p += (target - p) * .12 + .5; r.style.setProperty('--p', Math.min(p, target)); if (p < target) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
  track('search', { search_term: q });
}

function initFinder() {
  const input = $('#finderInput');
  $('#chips').innerHTML = QUICK.map(([label, id]) => {
    const it = CATALOG.find((c) => c.id === id);
    return `<button class="chip" style="--pc:${it.color[0]}" data-q="${esc(label)}">${esc(label)}</button>`;
  }).join('');
  let timer;
  input.addEventListener('input', () => {
    $$('.chip').forEach((c) => c.classList.toggle('on', c.dataset.q === input.value));
    clearTimeout(timer); timer = setTimeout(() => renderMatch(input.value), 120);
  });
  $('#chips').addEventListener('click', (e) => {
    const c = e.target.closest('.chip'); if (!c) return;
    input.value = c.dataset.q;
    $$('.chip').forEach((x) => x.classList.toggle('on', x === c));
    renderMatch(input.value);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName) && $('#detail').hidden) {
      e.preventDefault(); input.focus({ preventScroll: true }); scrollToSection('buscar');
    }
  });
}

// ---------- Catálogo ----------
function cardHtml(it, i) {
  return `<article class="card" style="${cssVars(it)};animation-delay:${i * 60}ms" data-cat="${esc(it.category)}" data-open="${it.id}" tabindex="0" aria-label="${esc(fullName(it))}">
    <div class="card-in">
      <div class="card-media">
        <img src="/assets/${it.id}/art.jpg" alt="" loading="lazy">
        <span class="card-badge"><i></i>En línea</span>
        <span class="card-time">${ico('video')} ${mins(it.minutes)}</span>
        <button class="card-play" data-video="${it.id}" aria-label="Ver video de ${esc(fullName(it))}"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
      </div>
      <div class="card-body">
        <h3>${nameHtml(it)}</h3>
        <p class="card-tag">${esc(it.tagline)}</p>
        <div class="card-rubros">${it.rubros.slice(0, 4).map((r) => `<span>${esc(r)}</span>`).join('')}</div>
        <div class="card-actions">
          <a class="btn btn-ghost" href="${it.url}" target="_blank" rel="noopener" data-demo="${it.id}">Probar demo</a>
          <button class="btn btn-pc" data-open="${it.id}">Ver detalles</button>
        </div>
      </div>
    </div>
  </article>`;
}

function soonHtml(it) {
  const name = it ? fullName(it) : 'Tu rubro aquí';
  return `<article class="card soon"${it ? '' : ' id="soonCard"'} style="--pc:${it ? it.color[0] : '#a78bfa'};--pc2:${it ? it.color[1] : '#6366f1'}" data-cat="${it ? esc(it.category) : '*'}">
    <div class="card-in"><div>
      <div class="soon-orb">${ico('plus')}</div>
      <div><h3>${esc(name)}</h3>
      <p>${it ? esc(it.tagline) : 'La línea Sano sigue creciendo. ¿Qué software necesita tu negocio? Lo construimos contigo.'}</p></div>
      <a class="btn btn-ghost" href="${waLink(it ? `Hola, me interesa ${name} cuando esté listo.` : 'Hola, quiero un software para mi negocio de: ')}" target="_blank" rel="noopener">${it ? 'Avísame cuando salga' : 'Proponer un software'}</a>
    </div></div>
  </article>`;
}

// "Tu rubro aquí" ocupa lo que sobre en la última fila (o la fila entera) para que la cuadrícula quede completa
function fitLastRow() {
  const grid = $('#grid'), soon = $('#soonCard');
  const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
  const n = $$('.card:not(.hide)', grid).filter((c) => c !== soon).length;
  const rest = n % cols;
  const span = rest ? cols - rest : cols;
  soon.style.gridColumn = `span ${span}`;
  soon.classList.toggle('wide', span >= 2 || cols === 1); // franja horizontal; si ocupa 1 de varias columnas, va como tarjeta
}

function renderCatalog() {
  const grid = $('#grid');
  grid.innerHTML = LIVE.map(cardHtml).join('') + CATALOG.filter((it) => it.status === 'pronto').map(soonHtml).join('') + soonHtml(null);
  const cats = ['Todos', ...new Set(LIVE.map((it) => it.category))];
  $('#filters').innerHTML = cats.map((c, i) => {
    const n = c === 'Todos' ? LIVE.length : LIVE.filter((it) => it.category === c).length;
    return `<button class="filter${i ? '' : ' on'}" role="tab" aria-selected="${!i}" data-cat="${esc(c)}">${esc(c)}<sup>${n}</sup></button>`;
  }).join('');
  $('#filters').addEventListener('click', (e) => {
    const b = e.target.closest('.filter'); if (!b) return;
    $$('.filter').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
    $$('.card', grid).forEach((card) => {
      const show = b.dataset.cat === 'Todos' || card.dataset.cat === b.dataset.cat || card.dataset.cat === '*';
      card.classList.toggle('hide', !show);
      if (show) { card.style.animation = 'none'; void card.offsetWidth; card.style.animation = ''; }
    });
    fitLastRow();
  });
  fitLastRow();
  new ResizeObserver(fitLastRow).observe(grid);
  // inclinación 3D y reflejo que sigue al cursor
  if (matchMedia('(hover: hover)').matches) {
    grid.addEventListener('pointermove', (e) => {
      const card = e.target.closest('.card'); if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - .5) * 10}deg`);
      card.style.setProperty('--rx', `${(.5 - y) * 8}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    grid.addEventListener('pointerout', (e) => {
      const card = e.target.closest('.card');
      if (card && !card.contains(e.relatedTarget)) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
    });
  }
}

// ---------- SanoTV ----------
let tvIndex = 0;
function renderTV() {
  $('#tvList').innerHTML = LIVE.map((it, i) => `<li class="tv-item" style="${cssVars(it)}" data-tv="${i}" tabindex="0" role="button" aria-label="Ver video de ${esc(fullName(it))}">
    <div class="tv-thumb"><img src="/assets/${it.id}/cover.jpg" alt="" loading="lazy"><span>${mins(it.minutes)}</span></div>
    <div><b>${esc(fullName(it))}</b><small>${esc(it.category)} · ${esc(it.rubros.slice(0, 2).join(', '))}</small><span class="eq"><i></i><i></i><i></i></span></div>
  </li>`).join('');
  const video = $('#tvVideo');
  video.addEventListener('play', () => { $('#tvPlay').classList.add('hide'); $('.tv-item.on')?.classList.add('playing'); track('video_play', { software: LIVE[tvIndex].id, place: 'tv' }); });
  video.addEventListener('pause', () => $('.tv-item.on')?.classList.remove('playing'));
  video.addEventListener('ended', () => { if (tvIndex < LIVE.length - 1) selectTV(tvIndex + 1, true); });
  $('#tvPlay').addEventListener('click', () => video.play());
  $('#tvList').addEventListener('click', (e) => { const li = e.target.closest('[data-tv]'); if (li) selectTV(+li.dataset.tv, true); });
  selectTV(0, false);
}

function selectTV(i, autoplay) {
  tvIndex = i;
  const it = LIVE[i], video = $('#tvVideo');
  video.pause();
  video.poster = `/assets/${it.id}/cover.jpg`;
  video.src = it.video;
  $('.tv-frame').style.setProperty('--tvc', it.color[0]);
  $$('.tv-item').forEach((li, k) => li.classList.toggle('on', k === i));
  $('#tvPlay').classList.toggle('hide', autoplay);
  $('#tvMeta').innerHTML = `<img src="/assets/${it.id}/logo.svg" alt="">
    <div class="grow"><h3>${esc(fullName(it))}</h3><p>${esc(it.tagline)}</p></div>
    <a class="btn btn-ghost" href="${it.url}" target="_blank" rel="noopener" data-demo="${it.id}">Probar demo</a>
    <button class="btn btn-glow" data-open="${it.id}">Ver ficha</button>`;
  const active = $$('.tv-item')[i];
  const list = $('#tvList');
  list.scrollTo({ left: active.offsetLeft - 8, top: active.offsetTop - 8, behavior: 'smooth' });
  if (autoplay) video.play().catch(() => $('#tvPlay').classList.remove('hide'));
}

function playInTV(id) {
  const i = LIVE.findIndex((it) => it.id === id);
  if (i < 0) return;
  scrollToSection('tv');
  selectTV(i, true);
}

// ---------- Todos incluyen ----------
function renderBento() {
  $('#bento').innerHTML = COMMON.map(([icon, title, text], i) => `<div class="bento-item reveal" style="transition-delay:${i * 60}ms">
    <div class="bento-ico">${ico(icon)}</div><h3>${esc(title)}</h3><p>${esc(text)}</p>
    ${i === 0 ? `<div class="demo-timer"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52"/><circle class="arc" cx="60" cy="60" r="52"/></svg><div><b id="demoClock">30:00</b><small>PIN <span class="pin">1234</span></small></div></div>` : ''}
  </div>`).join('');
  // reloj de la demo: corre una cuenta regresiva de muestra (60x más rápido) y vuelve a empezar
  const clock = $('#demoClock'), arc = $('.demo-timer .arc');
  if (!clock) return;
  let left = 1800;
  setInterval(() => {
    left = left <= 0 ? 1800 : left - 6;
    clock.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    arc.style.strokeDashoffset = 326.7 * (1 - left / 1800);
  }, 100);
}

// ---------- Comparativa ----------
function renderCompare() {
  const cell = (v) => v === true ? `<span class="yes" aria-label="Sí">${ico('check')}</span>` : v ? `<span class="txt">${esc(v)}</span>` : '<span class="no" aria-label="No">—</span>';
  $('#compare').innerHTML = `<thead><tr><th>Software</th>${COMPARE_COLS.map(([, l]) => `<th>${esc(l)}</th>`).join('')}<th>Moneda</th></tr></thead>
    <tbody>${LIVE.map((it) => `<tr data-open="${it.id}"><th><img src="/assets/${it.id}/logo.svg" alt="">${esc(fullName(it))}</th>${COMPARE_COLS.map(([k]) => `<td>${cell(it.compare[k])}</td>`).join('')}<td><span class="txt">${esc(it.moneda)}</span></td></tr>`).join('')}</tbody>`;
}

// ---------- Ficha del software (#/id) ----------
let lastFocus = null;
function detailHtml(it) {
  const i = LIVE.indexOf(it);
  const prev = LIVE[(i - 1 + LIVE.length) % LIVE.length], next = LIVE[(i + 1) % LIVE.length];
  const shots = it.screens || [];
  return `<button class="d-close" data-close aria-label="Cerrar">${ico('x')}</button>
    <header class="d-hero">
      <div class="d-top">
        <img src="/assets/${it.id}/logo.svg" alt="">
        <div><p class="d-cat">${esc(it.category)} · ${esc(it.rubros[0])}</p><h2 id="detailTitle">${nameHtml(it)}</h2></div>
      </div>
      <p class="d-tag">${esc(it.tagline)}</p>
      <div class="d-actions">
        <a class="btn btn-pc btn-lg" href="${it.url}" target="_blank" rel="noopener" data-demo="${it.id}">${ico('ext')} Abrir ${esc(fullName(it))}</a>
        <a class="btn btn-wa btn-lg" href="${waLink(`Hola, me interesa ${fullName(it)} para mi negocio.`)}" target="_blank" rel="noopener" data-wa="${it.id}">${ico('whatsapp')} Lo quiero</a>
        <button class="btn btn-ghost btn-lg" data-share="${it.id}">${ico('ext')} Compartir</button>
      </div>
    </header>
    <div class="d-body">
      <div class="d-video"><video controls playsinline preload="none" poster="/assets/${it.id}/cover.jpg" src="${it.video}" data-sw="${it.id}"></video></div>
      <div class="d-cols">
        <div>
          <p class="d-sub">Qué es</p>
          <p class="d-desc">${esc(it.description)}</p>
          <div class="d-facts">
            <div><small>Moneda</small><b>${esc(it.moneda)}</b></div>
            <div><small>Demo</small><b>30 min gratis · PIN 1234</b></div>
            <div><small>Funciona en</small><b>PC, tablet y teléfono</b></div>
            <div><small>Video</small><b>${mins(it.minutes)} narrado</b></div>
          </div>
        </div>
        <div>
          <p class="d-sub">Funciones principales</p>
          <div class="d-feats">${it.features.map(([icon, t, d]) => `<div class="d-feat">${ico(icon)}<b>${esc(t)}</b><span>${esc(d)}</span></div>`).join('')}</div>
        </div>
      </div>
      ${shots.length ? `<div><p class="d-sub">Capturas</p><div class="d-shots">${shots.map((s) => `<button class="${s.startsWith('movil') ? 'm' : ''}" data-shot="/assets/${it.id}/screens/${s}.png" aria-label="Ampliar captura"><img src="/assets/${it.id}/screens/${s}.png" alt="Pantalla de ${esc(fullName(it))}" loading="lazy"></button>`).join('')}</div></div>` : ''}
      <div><p class="d-sub">Ideal para</p><div class="d-rubros">${it.rubros.map((r) => `<span>${esc(r)}</span>`).join('')}</div></div>
      <div class="d-demo">
        <div><b>Pruébalo gratis 30 minutos</b><p>Entra a la página, toca “Probar demo” y usa el PIN <span class="pin">1234</span></p></div>
        <a class="btn btn-pc" href="${it.url}" target="_blank" rel="noopener" data-demo="${it.id}">Ir a la demo ${ico('right')}</a>
      </div>
      <nav class="d-nav">
        <button data-go="${prev.id}">${ico('left')}<img src="/assets/${prev.id}/logo.svg" alt="">${esc(fullName(prev))}</button>
        <button data-go="${next.id}">${esc(fullName(next))}<img src="/assets/${next.id}/logo.svg" alt="">${ico('right')}</button>
      </nav>
    </div>`;
}

function openDetail(id) {
  const it = LIVE.find((c) => c.id === id);
  if (!it) return closeDetail(true);
  const box = $('#detail'), panel = $('#detailPanel');
  if (box.hidden) lastFocus = document.activeElement;
  panel.style.cssText = cssVars(it);
  panel.innerHTML = detailHtml(it);
  panel.scrollTop = 0;
  box.hidden = false;
  box.classList.remove('closing');
  document.body.classList.add('locked');
  $('#tvVideo').pause();
  $('.d-close', panel).focus({ preventScroll: true });
  document.title = `${fullName(it)} — SanoRepos`;
  $('video', panel).addEventListener('play', () => track('video_play', { software: it.id, place: 'ficha' }), { once: true });
  track('view_item', { software: it.id });
}

function closeDetail(silent) {
  const box = $('#detail');
  if (box.hidden) return;
  $$('video', box).forEach((v) => v.pause());
  const done = () => { box.hidden = true; box.classList.remove('closing'); $('#detailPanel').innerHTML = ''; };
  if (silent) done(); else { box.classList.add('closing'); setTimeout(done, 280); }
  document.body.classList.remove('locked');
  document.title = 'SanoRepos — El software ideal para tu negocio';
  lastFocus?.focus?.({ preventScroll: true });
}

function route() {
  const m = location.hash.match(/^#\/([\w-]+)/);
  if (m) openDetail(m[1]); else closeDetail();
}
const go = (id) => { location.hash = `/${id}`; };
const leave = () => {
  if (history.state?.fromSite) history.back();
  else history.replaceState(null, '', location.pathname + location.search), route();
};

// ---------- Navegación a secciones ----------
// Centra el contenido de la sección bajo el menú; si es más alto que la pantalla, alinea su título arriba.
function scrollToSection(id) {
  if (id === 'top') return scrollTo({ top: 0, behavior: 'smooth' });
  const sec = document.getElementById(id);
  if (!sec) return;
  const box = sec.querySelector('.wrap') || sec;
  const r = box.getBoundingClientRect();
  const navH = $('#nav').getBoundingClientRect().bottom + 12;
  const avail = innerHeight - navH;
  const top = r.top + scrollY;
  const y = r.height < avail ? top - navH - (avail - r.height) / 2 : top - navH - 8;
  scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}

// ---------- Interacciones globales ----------
function initEvents() {
  document.addEventListener('click', (e) => {
    const t = e.target;
    const anchor = t.closest('a[href^="#"]:not([href^="#/"])');
    if (anchor && anchor.getAttribute('href').length > 1) {
      e.preventDefault();
      return scrollToSection(anchor.getAttribute('href').slice(1));
    }
    const vid = t.closest('[data-video]');
    if (vid) { e.preventDefault(); e.stopPropagation(); return playInTV(vid.dataset.video); }
    if (t.closest('[data-close]')) return leave();
    const shot = t.closest('[data-shot]');
    if (shot) { const lb = $('#lightbox'); $('img', lb).src = shot.dataset.shot; lb.hidden = false; return; }
    if (t.closest('#lightbox')) { $('#lightbox').hidden = true; return; }
    const share = t.closest('[data-share]');
    if (share) {
      const it = LIVE.find((c) => c.id === share.dataset.share);
      const url = `${location.origin}/${it.id}`; // página con el logo del software para la vista previa (scripts/share.mjs)
      if (navigator.share) navigator.share({ title: fullName(it), text: it.tagline, url }).catch(() => {});
      else navigator.clipboard?.writeText(url).then(() => { share.lastChild.textContent = ' ¡Enlace copiado!'; });
      return;
    }
    const goBtn = t.closest('[data-go]');
    if (goBtn) { history.replaceState({ fromSite: true }, '', `#/${goBtn.dataset.go}`); return route(); }
    if (t.closest('[data-demo]')) track('open_demo', { software: t.closest('[data-demo]').dataset.demo });
    if (t.closest('[data-wa], .btn-wa, .wa-float')) track('contact_whatsapp', { software: t.closest('[data-wa]')?.dataset.wa || 'general' });
    if (t.closest('a')) return;
    const open = t.closest('[data-open]');
    if (open) { history.pushState({ fromSite: true }, '', `#/${open.dataset.open}`); route(); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!$('#lightbox').hidden) $('#lightbox').hidden = true;
      else if (!$('#detail').hidden) leave();
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-open][tabindex], [data-tv]')) { e.preventDefault(); e.target.click(); }
    // mantener el foco dentro de la ficha abierta
    if (e.key === 'Tab' && !$('#detail').hidden) {
      const f = $$('#detailPanel button, #detailPanel a, #detailPanel video');
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    }
  });
  addEventListener('hashchange', route);
  addEventListener('popstate', route);

  // nav, barra de progreso y enlace activo
  const nav = $('#nav'), bar = $('.progress');
  const onScroll = () => {
    nav.classList.toggle('scrolled', scrollY > 30);
    $('#waFloat').classList.toggle('show', scrollY > innerHeight * .5); // aparece al dejar el inicio
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${(scrollY / max) * 100}%`;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  $('#burger').addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    $('#burger').setAttribute('aria-expanded', open);
  });
  $('#navLinks').addEventListener('click', () => { nav.classList.remove('open'); $('#burger').setAttribute('aria-expanded', false); });
  const links = $$('#navLinks a');
  const spy = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['buscar', 'catalogo', 'tv', 'comparar', 'contacto'].forEach((id) => spy.observe($(`#${id}`)));

  // brillo que sigue al cursor
  const glow = $('.cursor-glow');
  addEventListener('pointermove', (e) => { glow.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`; }, { passive: true });

  // aparición al hacer scroll
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: .12 });
  $$('.reveal').forEach((el) => io.observe(el));

  // contadores del inicio
  $$('[data-count]').forEach((el) => {
    const target = +el.dataset.count, suf = el.dataset.suffix || '';
    const t0 = performance.now() + 400;
    const step = (now) => {
      const k = Math.min(Math.max((now - t0) / 1400, 0), 1);
      el.textContent = Math.round(target * (1 - (1 - k) ** 3)) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// ---------- Arranque ----------
function init() {
  $('#statSoft').dataset.count = LIVE.length;
  $('#heroCount').textContent = LIVE.length;
  $('#year').textContent = new Date().getFullYear();
  const wa = waLink('Hola, vengo de SanoRepos y quiero información sobre sus software.');
  $('#waFloat').href = wa;
  $('#ctaWa').href = waLink('Hola, quiero un software para mi negocio de: ');
  $('#footerLinks').innerHTML = LIVE.map((it) => `<a href="#/${it.id}">${esc(fullName(it))}</a>`).join('');
  renderMarquee();
  initFinder();
  renderCatalog();
  renderTV();
  renderBento();
  renderCompare();
  initEvents();

  const label = $('#planetLabel');
  startCosmos($('#cosmos'), LIVE, {
    onHover(it, x, y) {
      if (!it) { label.hidden = true; return; }
      label.hidden = false;
      label.style.left = `${x}px`; label.style.top = `${y}px`;
      label.style.borderColor = it.color[0];
      if (label.dataset.id !== it.id) { label.dataset.id = it.id; label.innerHTML = `${esc(fullName(it))}<small>${esc(it.category)} · toca para ver</small>`; }
    },
    onClick(it) { history.pushState({ fromSite: true }, '', `#/${it.id}`); route(); track('planet_click', { software: it.id }); }
  });
  startWaves($('#ctaCanvas'), ['#22d3ee', '#a78bfa', '#f472b6']);
  route();
}
init();
