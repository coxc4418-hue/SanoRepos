// SanoRepos — genera public/assets/og.jpg (imagen al compartir el enlace) desde el inicio del sitio
// Uso: node serve.mjs (en otra ventana) y luego node og.mjs [url]
import puppeteer from 'puppeteer-core';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://127.0.0.1:5111/';
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
const p = await b.newPage();
await p.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: 'networkidle2' });
await p.addStyleTag({ content: '.hero-stats,.hero-hint,.wa-float,.nav-links,.nav-cta,.hero-cta{display:none!important} .hero{padding-top:60px}' });
await new Promise((r) => setTimeout(r, 2500));
await p.screenshot({ path: path.join(here, '..', 'public', 'assets', 'og.jpg'), type: 'jpeg', quality: 86 });
await b.close();
console.log('og.jpg listo');
