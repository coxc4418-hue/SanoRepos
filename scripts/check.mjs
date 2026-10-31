// SanoRepos — Revisa el sitio en varios tamaños: scroll lateral, errores de consola y capturas.
// Uso: node check.mjs [url]   (sin url levanta un servidor local con ../public)
import puppeteer from 'puppeteer-core';
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(here, 'shots');
await mkdir(OUT, { recursive: true });
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let base = process.argv[2], server;
if (!base) {
  const root = path.join(here, '..', 'public');
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
  server = http.createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    try {
      const body = await readFile(path.join(root, p));
      res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
      res.end(body);
    } catch { res.writeHead(404); res.end('404'); }
  }).listen(5111);
  base = 'http://127.0.0.1:5111/';
}

const SIZES = [
  { name: '320', width: 320, height: 640, mobile: true },
  { name: '360', width: 360, height: 760, mobile: true },
  { name: '390', width: 390, height: 844, mobile: true },
  { name: '430', width: 430, height: 932, mobile: true },
  { name: '768', width: 768, height: 1024, mobile: true },
  { name: '1024', width: 1024, height: 768, mobile: true },
  { name: '1366', width: 1366, height: 768, mobile: false },
  { name: '1920', width: 1920, height: 1080, mobile: false }
];

const overflow = (W) => ({
  sw: document.documentElement.scrollWidth,
  over: [...document.querySelectorAll('body *')].filter((el) => {
    const r = el.getBoundingClientRect();
    if (!r.width || r.right <= W + 1) return false;
    if (el.closest('.marquee, .hero, #detail[hidden], .lightbox[hidden]')) return false;
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const ox = getComputedStyle(p).overflowX;
      if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') return false;
    }
    return true;
  }).slice(0, 6).map((el) => `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} → ${Math.round(el.getBoundingClientRect().right)}`)
});

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--autoplay-policy=no-user-gesture-required'] });
let fails = 0;
const full = process.env.FULL === '1';
for (const s of SIZES) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/analytics|googletagmanager|firebase|ERR_BLOCKED/i.test(m.text())) errors.push(m.text()); });
  await page.setViewport({ width: s.width, height: s.height, isMobile: s.mobile, hasTouch: s.mobile, deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: 'networkidle2' });
  await sleep(1800);
  await page.screenshot({ path: path.join(OUT, `${s.name}-hero.png`) });
  // recorre la página para disparar las animaciones de aparición
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 80)); } scrollTo({ top: 0, behavior: 'instant' }); });
  await sleep(600);
  const main = await page.evaluate(overflow, s.width);
  if (full) await page.screenshot({ path: path.join(OUT, `${s.name}-full.png`), fullPage: true });
  // buscador
  await page.type('#finderInput', 'pizzeria');
  await sleep(400);
  const match = await page.$$eval('.match-card h3', (h) => h.map((x) => x.textContent));
  const afterSearch = await page.evaluate(overflow, s.width);
  main.sw = Math.max(main.sw, afterSearch.sw); main.over.push(...afterSearch.over);
  // ficha
  await page.evaluate(() => { location.hash = '/sano-dental'; });
  await sleep(900);
  const det = await page.evaluate((W) => {
    const p = document.querySelector('#detailPanel');
    const over = [...p.querySelectorAll('*')].filter((el) => el.getBoundingClientRect().right > W + 1).slice(0, 5).map((el) => el.className);
    return { open: !document.querySelector('#detail').hidden, title: p.querySelector('h2')?.textContent, pw: p.scrollWidth, cw: p.clientWidth, over };
  }, s.width);
  await page.screenshot({ path: path.join(OUT, `${s.name}-ficha.png`) });
  await page.keyboard.press('Escape');
  await sleep(500);
  const closed = await page.evaluate(() => document.querySelector('#detail').hidden);
  const ok = main.sw <= s.width && !main.over.length && det.open && det.pw <= det.cw && !det.over.length && closed && match[0]?.includes('Restaurant') && !errors.length;
  if (!ok) fails++;
  console.log(`${ok ? 'OK ' : 'MAL'} ${s.name.padEnd(5)} ancho=${main.sw} ${main.over.join(' | ')} buscador=${match[0]} ficha=${det.title} ${det.pw}/${det.cw} ${det.over.join(',')} cerrada=${closed} ${errors.join(' ; ')}`);
  await page.close();
}
await browser.close();
server?.close();
console.log(fails ? `${fails} tamaño(s) con problemas` : 'Todo OK');
process.exit(fails ? 1 : 0);
