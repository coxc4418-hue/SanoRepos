// SanoRepos — vista previa al compartir (WhatsApp, Facebook, X) identificada por el LOGO de cada uno.
// Genera:
//   public/assets/share.png             logo de SanoRepos (enlace principal)
//   public/assets/<id>/share.png        logo de cada software
//   public/<id>.html                    enlace para compartir cada software: sanorepos.web.app/<id>
//                                       (los robots leen su logo y nombre; la persona va a la ficha #/<id>)
// Uso: node share.mjs   (correrlo al agregar un software o cambiar su logo, nombre o descripción)
import puppeteer from 'puppeteer-core';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SITE = 'https://sanorepos.web.app';
const SIZE = 600; // cuadrado: WhatsApp lo muestra como miniatura del logo junto al texto
const pub = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const { CATALOG } = await import(pathToFileURL(path.join(pub, 'js', 'catalog.js')).href);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 });

// El logo ocupa todo el cuadro; las esquinas redondeadas se rellenan con el color del borde del logo
async function logoPng(svgFile, outFile, bg) {
  const svg = (await readFile(svgFile)).toString('base64');
  await page.setContent(`<body style="margin:0;background:${bg}"><img src="data:image/svg+xml;base64,${svg}" style="display:block;width:${SIZE}px;height:${SIZE}px"></body>`);
  await page.screenshot({ path: outFile });
}

await logoPng(path.join(pub, 'assets', 'logo.svg'), path.join(pub, 'assets', 'share.png'), '#05060f');
console.log('logo SanoRepos');

for (const it of CATALOG.filter((c) => c.status !== 'pronto')) {
  const name = it.name.join('');
  await logoPng(path.join(pub, 'assets', it.id, 'logo.svg'), path.join(pub, 'assets', it.id, 'share.png'), '#05060f');
  const title = `${name} — ${it.tagline.replace(/\.$/, '')}`;
  const desc = `${it.description.split('. ')[0]}. Mira el video y pruébalo gratis en SanoRepos.`;
  const img = `${SITE}/assets/${it.id}/share.png`;
  await writeFile(path.join(pub, `${it.id}.html`), `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Generado por scripts/share.mjs — no editar a mano -->
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="theme-color" content="${it.color[0]}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SanoRepos">
  <meta property="og:locale" content="es_LA">
  <meta property="og:url" content="${SITE}/${it.id}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${img}">
  <meta property="og:image:secure_url" content="${img}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="${SIZE}">
  <meta property="og:image:height" content="${SIZE}">
  <meta property="og:image:alt" content="Logo de ${esc(name)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${img}">
  <link rel="canonical" href="${SITE}/${it.id}">
  <link rel="icon" href="/assets/${it.id}/logo.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/${it.id}/share.png">
  <script>location.replace('/#/${it.id}');</script>
  <style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#05060f;color:#eef0ff;font:16px system-ui,sans-serif}a{color:${it.color[0]}}</style>
</head>
<body><p>Abriendo <a href="/#/${it.id}">${esc(name)} en SanoRepos</a>…</p></body>
</html>
`);
  console.log('enlace', `${SITE}/${it.id}`);
}
await browser.close();

// Número de software en el HTML inicial (así no se ve un número viejo antes de que cargue el JavaScript)
const LIVE_N = CATALOG.filter((it) => it.status !== 'pronto').length;
const idx = path.join(pub, 'index.html');
const html = (await readFile(idx, 'utf8'))
  .replace(/(<span id="heroCount">)\d+(<\/span>)/, `$1${LIVE_N}$2`)
  .replace(/<b data-count="\d+" id="statSoft">\d+<\/b>/, `<b data-count="${LIVE_N}" id="statSoft">0</b>`);
await writeFile(idx, html);
console.log('index.html:', LIVE_N, 'software');
