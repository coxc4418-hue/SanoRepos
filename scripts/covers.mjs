// SanoRepos — genera para cada software del catálogo public/assets/<id>/cover.jpg (portada con texto, para videos)
// y art.jpg (solo logo, para las tarjetas).
// Uso: node covers.mjs            (vuelve a correrlo al agregar un software o cambiar sus datos)
import puppeteer from 'puppeteer-core';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(here, '..', 'public');
const { CATALOG } = await import(pathToFileURL(path.join(pub, 'js', 'catalog.js')).href);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

for (const it of CATALOG) {
  const logo = (await readFile(path.join(pub, 'assets', it.id, 'logo.svg'))).toString('base64');
  const [c1, c2] = it.color;
  await page.setContent(`<!doctype html><html><head>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@500;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; box-sizing: border-box; }
    body { width: 1280px; height: 720px; overflow: hidden; font-family: Inter, sans-serif; color: #eef0ff;
      background: radial-gradient(900px 600px at 0% 0%, ${c1}55, transparent 60%), radial-gradient(900px 600px at 100% 100%, ${c2}88, transparent 60%), #06071a; }
    .grid { position: absolute; inset: 0; background-image: linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px); background-size: 48px 48px; mask: radial-gradient(circle at 70% 50%, #000, transparent 75%); }
    .ring { position: absolute; right: -120px; top: 50%; width: 760px; height: 760px; transform: translateY(-50%); border-radius: 50%; border: 2px solid ${c1}44; }
    .ring.b { width: 560px; height: 560px; right: -20px; border-color: ${c1}66; }
    .ring.c { width: 360px; height: 360px; right: 80px; border-color: ${c1}88; box-shadow: 0 0 120px ${c1}55, inset 0 0 80px ${c1}33; }
    .logo { position: absolute; right: 150px; top: 50%; width: 220px; height: 220px; transform: translateY(-50%); border-radius: 52px; box-shadow: 0 30px 80px -10px ${c1}aa; }
    .txt { position: absolute; left: 90px; top: 50%; transform: translateY(-50%); width: 640px; }
    .cat { font: 600 22px Inter; letter-spacing: .18em; text-transform: uppercase; color: ${c1}; filter: brightness(1.3); }
    h1 { font: 700 104px/1 'Space Grotesk'; letter-spacing: -.03em; margin-top: 16px; }
    h1 em { font-style: normal; background: linear-gradient(100deg, ${c1}, ${c2}); -webkit-background-clip: text; color: transparent; filter: brightness(1.3) saturate(1.2); }
    p { font-size: 28px; line-height: 1.35; color: #c9cce8; margin-top: 22px; }
    .chips { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
    .chips span { font-size: 19px; padding: 8px 16px; border-radius: 999px; background: ${c1}22; border: 1px solid ${c1}55; }
  </style></head><body>
    <div class="grid"></div><div class="ring"></div><div class="ring b"></div><div class="ring c"></div>
    <img class="logo" src="data:image/svg+xml;base64,${logo}">
    <div class="txt">
      <div class="cat">${esc(it.category)}</div>
      <h1>${esc(it.name[0])}<em>${esc(it.name[1])}</em></h1>
      <p>${esc(it.tagline)}</p>
      <div class="chips">${it.features.slice(0, 4).map((f) => `<span>${esc(f[1])}</span>`).join('')}</div>
    </div>
  </body></html>`, { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(pub, 'assets', it.id, 'cover.jpg'), type: 'jpeg', quality: 85 });
  // variante sin texto para las tarjetas del catálogo: logo centrado con sus anillos
  await page.addStyleTag({ content: `.txt { display: none } .logo { right: 50%; transform: translate(50%, -50%) } .ring { right: 50%; transform: translate(50%, -50%) } .ring.b, .ring.c { right: 50%; }` });
  await page.screenshot({ path: path.join(pub, 'assets', it.id, 'art.jpg'), type: 'jpeg', quality: 82 });
  console.log('portada', it.id);
}
await browser.close();
