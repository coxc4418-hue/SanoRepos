# SanoRepos

Vitrina de todos los software de **Sano_Dev**: https://sanorepos.web.app

Sitio estático (HTML + CSS + JS, sin compilar) en Firebase Hosting, proyecto `sanorepos`.

## Estructura

```
public/
  index.html            página
  css/style.css         estilos
  js/catalog.js         ← LISTA DE SOFTWARE (lo único que se edita para agregar uno)
  js/app.js             arma buscador, catálogo, SanoTV, comparativa y fichas
  js/cosmos.js          animación orbital del inicio
  assets/<id>/          logo.svg, portada.jpg y screens/*.png de cada software
  assets/og.jpg         imagen que sale al compartir el enlace
scripts/
  serve.mjs             ver el sitio en la PC: node scripts/serve.mjs → http://127.0.0.1:5111
  check.mjs             prueba 8 tamaños de pantalla (320 px a 1920 px)
  og.mjs                regenera assets/og.jpg
```

## Agregar un software nuevo

1. Crea `public/assets/<id>/` con `logo.svg` y `portada.jpg` (y opcional `screens/pc-inicio.png`, etc.).
   Del proyecto del software: `public/assets/logo.svg` y `public/tutorial/portada.jpg`.
2. En `public/js/catalog.js` copia un bloque de `CATALOG` y cambia sus datos
   (id, nombre, colores, url, video, rubros, palabras clave, funciones y comparativa).
   Con `status: 'pronto'` aparece como "Próximamente" sin demo ni video.
3. Prueba: `cd scripts && node check.mjs`
4. Publica: `firebase deploy --only hosting --project sanorepos`

La órbita, el buscador, las tarjetas, SanoTV, la comparativa, el pie de página y la ficha (`#/<id>`) se generan solos.

## Enlaces directos a cada ficha

`https://sanorepos.web.app/#/sano-restaurant`, `#/sanogestion`, `#/sano-tecnico`, `#/sano-doctor`, `#/sano-dental`, `#/sano-gym`

## Analítica

Firebase Analytics (G-CBH09SZ0V4) registra: `view_item` (ficha abierta), `video_play`, `open_demo`,
`contact_whatsapp`, `search` y `planet_click`.
