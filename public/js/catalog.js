// SanoRepos — Catálogo de software de la línea Sano.
// Para AGREGAR un software nuevo: copia uno de los bloques de abajo, cambia sus datos
// y pon sus archivos en public/assets/<id>/ (logo.svg, portada.jpg y, si hay, screens/*.png).
// El sitio entero (órbita, buscador, tarjetas, SanoTV, comparativa y ficha) se arma solo con esta lista.
//
// Campos:
//   id         identificador corto, también es el enlace de la ficha (#/<id>)
//   name       nombre en dos partes [marca, rubro]; se muestra pegado (SanoGym) y el rubro va en color
//   status     'disponible' o 'pronto' (sale como "Próximamente", sin demo ni video)
//   color      [color principal, color secundario] — se usan en la órbita, tarjetas y ficha
//   url        dirección del software
//   video      video tutorial (mp4); poster = imagen de portada del video
//   minutes    duración del video
//   rubros     tipos de negocio que se muestran como etiquetas y alimentan el buscador
//   keywords   palabras extra para el buscador (sin acentos no hace falta: se normalizan)
//   moneda     texto corto sobre la moneda
//   features   [icono, título, texto] — iconos disponibles en ICONS (app.js)
//   compare    columnas de la comparativa (true / false / texto)

export const WHATSAPP = '584221906045';
export const BRAND = 'Sano_Dev';

export const CATALOG = [
  {
    id: 'sano-restaurant',
    name: ['Sano', 'Restaurant'],
    status: 'disponible',
    category: 'Comida',
    tagline: 'Punto de venta para comida rápida, mesas, cocina e inventario por recetas.',
    description:
      'SanoRestaurant controla tu negocio de comida de punta a punta: vendes para llevar, en mesa o por delivery, la comanda llega sola a la pantalla de cocina y cada plato descuenta del inventario los ingredientes de su receta. La caja cuadra en dólares y bolívares con la tasa BCV, y los reportes te dicen qué se vende, cuánto ganas y qué se está acabando.',
    color: ['#ff8a3d', '#c81e1e'],
    url: 'https://sano-restaurant.web.app/',
    video: 'https://sano-restaurant.web.app/tutorial/sano-restaurant-tutorial.mp4',
    minutes: 6,
    rubros: ['Comida rápida', 'Restaurante', 'Hamburguesería', 'Pizzería', 'Arepera', 'Cafetería', 'Food truck'],
    keywords: 'comida restaurante hamburguesa pizza arepa perro caliente cafe cafeteria food truck delivery mesas cocina comandas recetas mesonero bar parrilla sushi pollo heladeria',
    moneda: '$ y Bs con tasa BCV',
    screens: ['pc-inicio', 'pc-vender', 'pc-cocina', 'movil-inicio', 'movil-vender', 'movil-mesas'],
    features: [
      ['bolt', 'Venta rápida', 'Para llevar, en mesa o delivery en pocos toques.'],
      ['table', 'Mesas y rondas', 'Abre la mesa, suma rondas y cobra al final.'],
      ['chef', 'Pantalla de cocina', 'Las comandas llegan solas y se marcan al despachar.'],
      ['flask', 'Inventario por recetas', 'Cada plato descuenta sus ingredientes.'],
      ['cash', 'Caja $ y Bs', 'Cierre de caja con tasa BCV y pagos mixtos.'],
      ['chart', 'Reportes', 'Lo más vendido, ganancias y existencias.']
    ],
    compare: { ventas: true, inventario: 'Por recetas', agenda: false, whatsapp: true, qr: false, especial: 'Cocina y mesas' }
  },
  {
    id: 'sanogestion',
    name: ['Sano', 'Gestion'],
    status: 'disponible',
    category: 'Comercio',
    tagline: 'Punto de venta, inventario, caja y fiados para tiendas y bodegas.',
    description:
      'SanoGestion es el sistema para tiendas, bodegas y abastos. Vendes con lector o búsqueda rápida, el inventario se actualiza en cada venta, llevas los fiados de tus clientes sin cuaderno y cierras la caja cuadrada. Desde el panel de administrador ves todas tus sedes en un solo lugar.',
    color: ['#10b981', '#0e7490'],
    url: 'https://sano-gestion.web.app/',
    video: 'https://sano-gestion.web.app/tutorial/sanogestion-tutorial.mp4',
    minutes: 6.4,
    rubros: ['Bodega', 'Abasto', 'Minimarket', 'Supermercado', 'Tienda', 'Ferretería', 'Licorería'],
    keywords: 'bodega abasto minimarket supermercado tienda comercio ferreteria licoreria charcuteria papeleria perfumeria kiosko fiados credito ventas inventario mercado verduleria frutería carniceria',
    moneda: '$ y Bs con tasa BCV',
    screens: [],
    features: [
      ['cart', 'Punto de venta', 'Busca, escanea y cobra en segundos.'],
      ['box', 'Inventario vivo', 'Existencias al día y alertas de lo que falta.'],
      ['book', 'Fiados', 'Créditos de clientes con abonos y saldo.'],
      ['cash', 'Caja', 'Apertura, cierre y movimientos sin descuadres.'],
      ['chart', 'Reportes', 'Ventas, utilidad y productos estrella.'],
      ['building', 'Multisede', 'Todas tus tiendas desde un panel.']
    ],
    compare: { ventas: true, inventario: true, agenda: false, whatsapp: false, qr: false, especial: 'Fiados' }
  },
  {
    id: 'sano-tecnico',
    name: ['Sano', 'Tecnico'],
    status: 'disponible',
    category: 'Servicios',
    tagline: 'Órdenes de servicio, repuestos y garantías para talleres de reparación.',
    description:
      'SanoTecnico organiza tu servicio técnico de celulares, tablets y laptops. Cada equipo entra con su orden (IMEI, patrón, fotos y falla), avanza por un tablero de estados y tu cliente consulta en línea cómo va su reparación con un código. Presupuestas con repuestos del inventario, cobras abonos y entregas con factura y garantía.',
    color: ['#22d3ee', '#8b5cf6'],
    url: 'https://sano-tecnico.web.app/',
    video: 'https://sano-tecnico.web.app/tutorial/sano-tecnico-tutorial.mp4',
    minutes: 6,
    rubros: ['Servicio técnico', 'Reparación de celulares', 'Laptops y PC', 'Electrónica', 'Tablets'],
    keywords: 'servicio tecnico reparacion celulares telefonos laptops computadoras pc tablets electronica taller imei pantalla repuestos garantia consolas',
    moneda: '$ y Bs con tasa BCV',
    screens: ['pc-inicio', 'pc-ordenes', 'pc-recibir', 'movil-inicio', 'movil-ordenes', 'movil-estado'],
    features: [
      ['phone', 'Órdenes con IMEI', 'Patrón, fotos, accesorios y falla reportada.'],
      ['kanban', 'Tablero de estados', 'Recibido, en reparación, listo, entregado.'],
      ['search', 'Consulta en línea', 'El cliente ve su estado con un código.'],
      ['box', 'Repuestos', 'Presupuestos con piezas del inventario.'],
      ['shield', 'Garantías', 'Entrega con factura y garantía impresa.'],
      ['users', 'Técnicos', 'Asigna trabajos y calcula comisiones.']
    ],
    compare: { ventas: true, inventario: 'Repuestos', agenda: false, whatsapp: true, qr: 'Estado en línea', especial: 'Órdenes y garantías' }
  },
  {
    id: 'sano-doctor',
    name: ['Sano', 'Doctor'],
    status: 'disponible',
    category: 'Salud',
    tagline: 'Agenda, historia clínica, récipes y documentos con QR para consultorios.',
    description:
      'SanoDoctor es el consultorio en la nube para médicos generales. Agenda con sala de espera y recordatorios por WhatsApp, historia clínica con signos vitales y diagnósticos CIE-10, récipe con alerta de alergias, reposos, constancias e informes con código QR que cualquiera puede verificar. Además cobras, controlas tus insumos por lote y ves tus reportes.',
    color: ['#2dd4bf', '#1e3a8a'],
    url: 'https://sano-doctor.web.app/',
    video: 'https://sano-doctor.web.app/tutorial/sano-doctor-tutorial.mp4',
    minutes: 6,
    rubros: ['Consultorio médico', 'Medicina general', 'Pediatría', 'Medicina interna', 'Centro de salud'],
    keywords: 'medico doctor consultorio medicina general salud clinica pacientes historia clinica recipe receta cie10 pediatra internista ambulatorio centro medico',
    moneda: '$ y Bs con tasa BCV',
    screens: ['pc-inicio', 'pc-agenda', 'pc-consulta', 'movil-inicio', 'movil-agenda', 'movil-paciente'],
    features: [
      ['calendar', 'Agenda y sala de espera', 'Citas, llegada y turnos en tiempo real.'],
      ['heart', 'Historia clínica', 'Signos vitales, antecedentes y CIE-10.'],
      ['pill', 'Récipe seguro', 'Vademécum con alerta de alergias.'],
      ['qr', 'Documentos con QR', 'Reposos, constancias e informes verificables.'],
      ['whatsapp', 'Recordatorios', 'Avisos de cita por WhatsApp.'],
      ['box', 'Insumos por lote', 'Control de vencimientos y existencias.']
    ],
    compare: { ventas: 'Cobros', inventario: 'Insumos', agenda: true, whatsapp: true, qr: 'Documentos', especial: 'Historia clínica' }
  },
  {
    id: 'sano-dental',
    name: ['Sano', 'Dental'],
    status: 'disponible',
    category: 'Salud',
    tagline: 'Odontograma interactivo, presupuestos por fases y laboratorio para odontólogos.',
    description:
      'SanoDental está hecho para odontólogos y clínicas dentales de toda Latinoamérica. Odontograma interactivo con índice CPO-D, periodontograma, presupuestos por fases con abonos y financiamiento, agenda con recordatorios por WhatsApp, anestesia con dosis máxima calculada, consentimientos con QR verificable y control de trabajos de laboratorio. Eliges tu país y trabaja en tu moneda.',
    color: ['#38bdf8', '#312e81'],
    url: 'https://sano-dental.web.app/',
    video: 'https://sano-dental.web.app/tutorial/sano-dental-tutorial.mp4',
    minutes: 7.3,
    rubros: ['Odontología', 'Clínica dental', 'Ortodoncia', 'Odontopediatría', 'Estética dental'],
    keywords: 'odontologo odontologia dentista dental clinica dental ortodoncia brackets odontograma periodoncia endodoncia muelas dientes implantes estetica dental',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['tooth', 'Odontograma FDI', 'Interactivo, con índice CPO-D.'],
      ['layers', 'Presupuestos por fases', 'Abonos, financiamiento y avance.'],
      ['activity', 'Periodontograma', 'Sondaje y evolución periodontal.'],
      ['flask', 'Laboratorio dental', 'Trabajos enviados, costos y entregas.'],
      ['qr', 'Consentimientos con QR', 'Firmados y verificables en línea.'],
      ['globe', 'Tu país, tu moneda', 'Funciona en toda Latinoamérica.']
    ],
    compare: { ventas: 'Cobros', inventario: 'Insumos', agenda: true, whatsapp: true, qr: 'Consentimientos', especial: 'Odontograma' }
  },
  {
    id: 'sano-gym',
    name: ['Sano', 'Gym'],
    status: 'disponible',
    category: 'Fitness',
    tagline: 'Acceso con QR, membresías, clases y rutinas para gimnasios.',
    description:
      'SanoGym administra tu gimnasio sin papeles. Tus socios entran con su carnet QR en modo kiosco, las membresías por tiempo o sesiones se controlan solas (con congelamiento y horario), las renovaciones se cobran por WhatsApp y las clases tienen reservas con lista de espera. También armas rutinas, registras evaluaciones físicas y vendes suplementos en la tienda.',
    color: ['#bef264', '#4d7c0f'],
    url: 'https://sano-gym.web.app/',
    video: 'https://sano-gym.web.app/tutorial/sano-gym-tutorial.mp4',
    minutes: 6.9,
    rubros: ['Gimnasio', 'CrossFit', 'Box', 'Yoga y pilates', 'Artes marciales', 'Academia de baile'],
    keywords: 'gimnasio gym crossfit box fitness yoga pilates artes marciales karate boxeo baile danza academia entrenador socios membresias mensualidad rutinas spinning natacion',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['qr', 'Acceso con QR', 'Carnet digital y modo kiosco en la entrada.'],
      ['card', 'Membresías', 'Por tiempo, sesiones o pase; congela y renueva.'],
      ['whatsapp', 'Cobranza por WhatsApp', 'Avisos de renovación en un toque.'],
      ['calendar', 'Clases grupales', 'Reservas con cupos y lista de espera.'],
      ['dumbbell', 'Rutinas y evaluaciones', 'Planes y medidas de cada socio.'],
      ['cart', 'Tienda', 'Suplementos y productos en la misma caja.']
    ],
    compare: { ventas: 'Tienda', inventario: true, agenda: 'Clases', whatsapp: true, qr: 'Carnet y acceso', especial: 'Membresías' }
  }
];

// Lo que incluyen todos los software Sano (sección "Todos incluyen")
export const COMMON = [
  ['building', '20 sedes + administrador', 'Cada software trae 20 sedes y un panel central para verlas todas.'],
  ['play', 'Demo gratis de 30 minutos', 'Pruébalo sin registrarte, con datos de ejemplo. PIN de la demo: 1234.'],
  ['download', 'Se instala como app', 'Desde Chrome o Edge en PC, tablet o teléfono, sin tiendas.'],
  ['cloud', '100% en la nube', 'Tus datos seguros y sincronizados en todos tus equipos.'],
  ['compass', 'Recorrido guiado', 'El sistema te enseña paso a paso dentro de cada pantalla.'],
  ['video', 'Video tutorial', 'Cada software tiene su video explicativo narrado.']
];

// Columnas de la comparativa
export const COMPARE_COLS = [
  ['ventas', 'Ventas y cobros'],
  ['inventario', 'Inventario'],
  ['agenda', 'Agenda / citas'],
  ['whatsapp', 'WhatsApp'],
  ['qr', 'Código QR'],
  ['especial', 'Lo especial']
];
