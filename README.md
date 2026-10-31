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
  assets/<id>/          logo.svg, cover.jpg y screens/*.png de cada software
  assets/share.png      logo de SanoRepos que sale al compartir el enlace
  <id>.html             enlace para compartir cada software con su logo (lo genera share.mjs)
scripts/
  serve.mjs             ver el sitio en la PC: node scripts/serve.mjs → http://127.0.0.1:5111
  check.mjs             prueba 8 tamaños de pantalla (320 px a 1920 px)
  covers.mjs            genera assets/<id>/cover.jpg (portada de cada software)
  share.mjs             logos para compartir + páginas sanorepos.web.app/<id>
  icons.mjs             genera los íconos PNG desde assets/logo.svg (logo al compartir en WhatsApp/Facebook)
```

## Agregar un software nuevo

1. Crea `public/assets/<id>/` con `logo.svg` (del proyecto del software: `public/assets/logo.svg`)
   y, si quieres, capturas en `screens/pc-inicio.png`, etc.
2. En `public/js/catalog.js` copia un bloque de `CATALOG` y cambia sus datos
   (id, nombre, colores, url, video, rubros, palabras clave, funciones y comparativa).
   Con `status: 'pronto'` aparece como "Próximamente" sin demo ni video.
3. Genera su portada y su enlace para compartir: `cd scripts && node covers.mjs && node share.mjs`
4. Prueba: `node check.mjs`
5. Publica: `firebase deploy --only hosting --project sanorepos`

La órbita, el buscador, las tarjetas, SanoTV, la comparativa, el pie de página y la ficha (`#/<id>`) se generan solos.

## Enlaces directos a cada ficha

`https://sanorepos.web.app/#/sano-restaurant`, `#/sanogestion`, `#/sano-tecnico`, `#/sano-doctor`, `#/sano-dental`, `#/sano-gym`

## Analítica

Firebase Analytics (G-CBH09SZ0V4) registra: `view_item` (ficha abierta), `video_play`, `open_demo`,
`contact_whatsapp`, `search` y `planet_click`.

## Vista previa al compartir (WhatsApp / Facebook)

Cada enlace se identifica por su logo:
- `https://sanorepos.web.app` → logo de SanoRepos (`assets/share.png`).
- `https://sanorepos.web.app/sano-gym` (y los demás `/<id>`) → logo, nombre y descripción de ese software; al abrirlo lleva a su ficha.
  El botón "Compartir" de cada ficha usa este enlace. Los enlaces con `#/` no sirven para compartir: WhatsApp y Facebook ignoran lo que va después del `#`.

WhatsApp y Facebook guardan la vista previa en caché: en Facebook se refresca en https://developers.facebook.com/tools/debug/ con "Volver a extraer".
