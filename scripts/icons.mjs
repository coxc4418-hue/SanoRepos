// SanoRepos — genera los íconos PNG desde public/assets/logo.svg
// (WhatsApp, Facebook e iPhone no usan SVG: necesitan PNG para mostrar el logo)
// Uso: node icons.mjs
import puppeteer from 'puppeteer-core';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pub = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = (await readFile(path.join(pub, 'assets', 'logo.svg'))).toString('base64');
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new' });
const page = await browser.newPage();
for (const [name, size, pad] of [['favicon.png', 48, 0], ['apple-touch-icon.png', 180, 0], ['icon-512.png', 512, 0], ['icon-maskable.png', 512, 0.1]]) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  // el ícono "maskable" lleva margen y fondo lleno para que Android pueda recortarlo en círculo
  await page.setContent(`<body style="margin:0;background:${pad ? '#05060f' : 'transparent'}"><img src="data:image/svg+xml;base64,${svg}" style="display:block;width:${size * (1 - pad * 2)}px;margin:${size * pad}px"></body>`);
  await page.screenshot({ path: path.join(pub, 'assets', name), omitBackground: !pad });
  console.log(name);
}
await browser.close();
