// SanoRepos — Catálogo de software de la línea Sano.
// Para AGREGAR un software nuevo: copia uno de los bloques de abajo, cambia sus datos
// pon su logo en public/assets/<id>/logo.svg (y, si hay, capturas en screens/*.png)
// y corre `node scripts/covers.mjs` para crear su portada (cover.jpg).
// El sitio entero (órbita, buscador, tarjetas, SanoTV, comparativa y ficha) se arma solo con esta lista.
//
// Campos:
//   id         identificador corto, también es el enlace de la ficha (#/<id>)
//   name       nombre en dos partes [marca, rubro]; se muestra pegado (SanoGym) y el rubro va en color
//   status     'disponible' o 'pronto' (sale como "Próximamente", sin demo ni video)
//   color      [color principal, color secundario] — se usan en la órbita, tarjetas y ficha
//   url        dirección del software
//   video      video tutorial (mp4); la portada (cover.jpg) la genera scripts/covers.mjs
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
      'SanoGestion es el sistema para tiendas, bodegas y abastos. Vendes con lector o búsqueda rápida, el inventario se actualiza en cada venta, llevas los fiados de tus clientes sin cuaderno y cierras la caja cuadrada.',
    color: ['#10b981', '#0e7490'],
    url: 'https://sano-gestion.web.app/',
    video: 'https://sano-gestion.web.app/tutorial/sanogestion-tutorial.mp4',
    minutes: 6.4,
    rubros: ['Bodega', 'Abasto', 'Minimarket', 'Supermercado', 'Tienda', 'Frutería'],
    keywords: 'bodega abasto minimarket supermercado tienda comercio licoreria charcuteria papeleria perfumeria kiosko fiados credito ventas inventario mercado verduleria frutería carniceria',
    moneda: '$ y Bs con tasa BCV',
    screens: [],
    features: [
      ['cart', 'Punto de venta', 'Busca, escanea y cobra en segundos.'],
      ['box', 'Inventario vivo', 'Existencias al día y alertas de lo que falta.'],
      ['book', 'Fiados', 'Créditos de clientes con abonos y saldo.'],
      ['cash', 'Caja', 'Apertura, cierre y movimientos sin descuadres.'],
      ['chart', 'Reportes', 'Ventas, utilidad y productos estrella.'],
      ['download', 'En cualquier equipo', 'PC, tablet o teléfono, instalable como app.']
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
  },
  {
    id: 'sano-entrenador',
    name: ['Sano', 'Entrenador'],
    status: 'disponible',
    category: 'Fitness',
    tagline: 'Agenda, rutinas guiadas y el progreso de cada alumno para entrenadores personales.',
    description:
      'SanoEntrenador organiza tu trabajo como entrenador personal. Agendas tus sesiones (presenciales u online), marcas la asistencia con el QR del carnet y los paquetes se descuentan solos. Armas rutinas con más de 120 ejercicios explicados con su mapa de músculos o las creas a la medida en segundos. Cada alumno tiene su carnet en el teléfono: entrena con su rutina, anota sus cargas, se pesa y ve su progreso en gráficas. Los recordatorios y cobros salen por WhatsApp, y tienes tu propia página con tus planes.',
    color: ['#fb923c', '#9a3412'],
    url: 'https://sano-entrenador.web.app/',
    video: 'https://sano-entrenador.web.app/tutorial/sano-entrenador-tutorial.mp4',
    minutes: 5.5,
    rubros: ['Entrenador personal', 'Coach online', 'Preparador físico', 'Entrenamiento funcional', 'Nutrición deportiva'],
    keywords: 'entrenador personal coach trainer preparador fisico entrenamiento online asesoria rutinas ejercicios progreso peso medidas evaluaciones sesiones paquetes alumnos clientes fitness gimnasio funcional calistenia',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['calendar', 'Agenda de sesiones', 'Presenciales, online y series semanales.'],
      ['qr', 'Asistencia con QR', 'Descuenta sesiones del paquete sola.'],
      ['dumbbell', 'Rutinas guiadas', '120+ ejercicios y rutinas a la medida.'],
      ['chart', 'Progreso del alumno', 'Peso, medidas y logros en su carnet.'],
      ['whatsapp', 'Recordatorios por WhatsApp', 'Confirmaciones, vencimientos y cobros.'],
      ['globe', 'Tu página pública', 'Tus planes y un botón para escribirte.']
    ],
    compare: { ventas: 'Planes y sesiones', inventario: false, agenda: true, whatsapp: true, qr: 'Carnet y asistencia', especial: 'Progreso del alumno' }
  },
  {
    id: 'sano-cortes',
    name: ['Sano', 'Cortes'],
    status: 'disponible',
    category: 'Belleza',
    tagline: 'Agenda por barbero, reservas en línea y sala de espera para barberías y peluquerías.',
    description:
      'SanoCortes organiza tu barbería o peluquería de punta a punta. Cada barbero tiene su agenda y tus clientes reservan solos en línea viendo solo las horas libres; la sala de espera numera a los que llegan sin cita con su tiempo estimado y una pantalla de turnos para el TV. Guarda la receta de cada corte, avisa por WhatsApp a quién le toca volver, maneja sellos de fidelidad y club de cortes, y liquida a tus barberos por comisión, alquiler de silla o sueldo.',
    color: ['#e8b04b', '#7a1f1f'],
    url: 'https://sano-cortes.web.app/',
    video: 'https://sano-cortes.web.app/tutorial/sano-cortes-tutorial.mp4',
    minutes: 8.1,
    rubros: ['Barbería', 'Peluquería', 'Barber shop', 'Peluquería masculina', 'Salón de belleza'],
    keywords: 'barberia barbero barber shop peluqueria peluquero estilista salon corte cabello pelo degradado fade barba afeitado citas turnos reservas agenda comisiones alquiler de silla fidelidad sellos club',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['calendar', 'Agenda por barbero', 'Reservas en línea con horas libres reales.'],
      ['chair', 'Sala de espera', 'Turnos sin cita y pantalla para el TV.'],
      ['scissors', 'Receta del corte', 'Degradado, máquina, barba y foto.'],
      ['whatsapp', '“Te toca corte”', 'Avisos por WhatsApp en un toque.'],
      ['heart', 'Sellos y club', 'Corte gratis y cortes prepagados.'],
      ['cash', 'Pago a barberos', 'Comisión, alquiler de silla o sueldo.']
    ],
    compare: { ventas: 'Servicios y productos', inventario: true, agenda: 'Por barbero', whatsapp: true, qr: 'Tarjeta del cliente', especial: 'Sala de espera' }
  },
  {
    id: 'sano-farmacia',
    name: ['Sano', 'Farmacia'],
    status: 'disponible',
    category: 'Salud',
    tagline: 'Venta por caja, blíster o unidad, lotes y vencimientos, recetas y pedidos en línea para farmacias.',
    description:
      'SanoFarmacia maneja tu farmacia completa. Vendes por caja, blíster o unidad con el lector de código de barras y el sistema descuenta primero el lote que vence antes; te avisa de lo que está por vencer o agotarse y te arma el pedido para tu droguería. Lleva el libro de recetas y de controlados, la ficha de cada paciente con sus alergias y tratamientos, le avisa por WhatsApp cuando se le acaba su medicina, maneja convenios y seguros, puntos y un catálogo para que tus clientes te pidan en línea con delivery.',
    color: ['#34d399', '#0f766e'],
    url: 'https://sano-farmacia.web.app/',
    video: 'https://sano-farmacia.web.app/tutorial/sano-farmacia-tutorial.mp4',
    minutes: 6.5,
    rubros: ['Farmacia', 'Droguería', 'Botica', 'Farmacia de barrio', 'Cadena de farmacias'],
    keywords: 'farmacia farmaceutico drogueria botica medicamentos medicinas receta recipe controlados psicotropicos antibioticos lotes vencimientos fraccionado blister unidad principio activo generico codigo de barras convenios seguros pedidos delivery recompra tension glucosa',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['pill', 'Caja, blíster o unidad', 'Fracciona con su precio y lector de código.'],
      ['layers', 'Lotes y vencimientos', 'Sale primero lo que vence antes.'],
      ['shield', 'Recetas y controlados', 'Libro de recetas listo para la inspección.'],
      ['whatsapp', 'Recompras', 'Avisa cuando se acaba el tratamiento.'],
      ['cart', 'Pedidos en línea', 'Catálogo propio con delivery.'],
      ['box', 'Compras', 'Sugerido, recepción y cuentas por pagar.']
    ],
    compare: { ventas: 'Caja, blíster o unidad', inventario: 'Por lotes', agenda: false, whatsapp: true, qr: 'Tarjeta del paciente', especial: 'Recetas y vencimientos' }
  },
  {
    id: 'sano-vet',
    name: ['Sano', 'Vet'],
    status: 'disponible',
    category: 'Salud',
    tagline: 'Historia clínica, vacunas con carnet digital, agenda, peluquería y tienda para clínicas veterinarias.',
    description:
      'SanoVet maneja tu clínica veterinaria completa. Lleva la historia clínica de cada mascota con sus signos vitales, diagnóstico y récipe; sus vacunas y desparasitaciones con carnet digital y QR en el teléfono del tutor; la agenda de consultas, vacunas y baños con sala de espera; la peluquería y la hospitalización. Le avisa a cada tutor por WhatsApp cuándo le toca la próxima vacuna, y vende alimento por saco o por kilo, antiparasitarios y accesorios con lotes, vencimientos y pedidos en línea.',
    color: ['#a78bfa', '#7c3aed'],
    url: 'https://sano-vet.web.app/',
    video: 'https://sano-vet.web.app/tutorial/sano-vet-tutorial.mp4',
    minutes: 7.6,
    rubros: ['Clínica veterinaria', 'Consultorio veterinario', 'Pet shop', 'Peluquería canina', 'Hospital veterinario'],
    keywords: 'veterinaria veterinario clinica veterinaria mascotas perros gatos vacunas carnet de vacunacion desparasitacion antipulgas historia clinica consulta recipe peluqueria canina grooming baño hospitalizacion pet shop alimento concentrado croquetas agenda citas tutor recordatorios',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['activity', 'Historia clínica', 'Signos vitales, diagnóstico y récipe.'],
      ['qr', 'Carnet de vacunas', 'Digital con QR en el teléfono del tutor.'],
      ['calendar', 'Agenda y sala de espera', 'Por veterinario y peluquero.'],
      ['scissors', 'Peluquería y hospital', 'Por etapas, con aviso al tutor.'],
      ['whatsapp', 'Recordatorios', '“Le toca su vacuna” en un toque.'],
      ['cart', 'Tienda y pedidos', 'Alimento por kilo, lotes y delivery.']
    ],
    compare: { ventas: 'Servicios y productos', inventario: 'Por lotes', agenda: 'Por veterinario', whatsapp: true, qr: 'Carnet de la mascota', especial: 'Historia y vacunas' }
  },
  {
    id: 'sano-taller',
    name: ['Sano', 'Taller'],
    status: 'disponible',
    category: 'Automotriz',
    tagline: 'Órdenes de trabajo, presupuesto aprobado desde el teléfono, mantenimiento por kilometraje, autolavado y repuestos.',
    description:
      'SanoTaller maneja tu taller mecánico y tu autolavado. Recibe cada vehículo con su kilometraje, combustible, revisión y los daños marcados en el dibujo; lleva las órdenes en un tablero por estado con la mano de obra de cada mecánico y los repuestos, y manda el presupuesto por WhatsApp para que el cliente lo apruebe desde su teléfono. Calcula el próximo cambio de aceite, frenos o correa por kilometraje y te dice a quién escribirle; maneja la cola del autolavado por placa y vende repuestos y aceite por galón o por litro con inventario, compras y comisión por mecánico.',
    color: ['#60a5fa', '#1d4ed8'],
    url: 'https://sano-taller.web.app/',
    video: 'https://sano-taller.web.app/tutorial/sano-taller-tutorial.mp4',
    minutes: 7.3,
    rubros: ['Taller mecánico', 'Autolavado', 'Lubricadora', 'Venta de repuestos', 'Taller de motos', 'Flotas y taxis'],
    keywords: 'taller mecanico mecanica automotriz autolavado lavado de carros lavadero car wash lubricadora cambio de aceite repuestos autopartes vehiculos carros motos placa kilometraje mantenimiento frenos correa alineacion balanceo diagnostico escaner presupuesto orden de trabajo recepcion flota taxi',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['kanban', 'Órdenes de trabajo', 'Tablero por estado, mecánico y bitácora.'],
      ['phone', 'Presupuesto en el teléfono', 'El cliente aprueba con un toque.'],
      ['gauge', 'Mantenimiento por km', 'Aceite, frenos y correa a tiempo.'],
      ['droplet', 'Autolavado', 'Cola por placa con aviso al cliente.'],
      ['qr', 'Ficha del vehículo', 'Estado e historial con QR.'],
      ['wrench', 'Repuestos y aceite', 'Por galón o litro, compatibles con el carro.']
    ],
    compare: { ventas: 'Órdenes y lavados', inventario: true, agenda: 'Por mecánico', whatsapp: true, qr: 'Ficha del vehículo', especial: 'Presupuesto y kilometraje' }
  },
  {
    id: 'sano-licores',
    name: ['Sano', 'Licores'],
    status: 'disponible',
    category: 'Comercio',
    tagline: 'Venta por unidad, six-pack o caja, fría o al mayor, envases retornables, combos y fiado para licorerías.',
    description:
      'SanoLicores maneja tu licorería completa. Vendes por unidad, six-pack o caja con el lector de código de barras, fría o al tiempo, al detal o al mayor con su precio. Lleva tus envases retornables: cobra el depósito de los vacíos que faltan o se los presta al cliente y te dice quién te debe. Arma combos de ron con refresco y hielo, controla el fiado con un límite por cliente, le escribe por WhatsApp al que dejó de venir y te da un catálogo para que te pidan en línea, bien frías y con delivery. También compras a tus distribuidoras, roturas, vencimientos, caja en dos monedas y reportes de ganancia.',
    color: ['#fbbf24', '#9f1239'],
    url: 'https://sano-licores.web.app/',
    video: 'https://sano-licores.web.app/tutorial/sano-licores-tutorial.mp4',
    minutes: 6.5,
    rubros: ['Licorería', 'Depósito de licores', 'Distribuidora de bebidas', 'Venta de cervezas', 'Bodegón'],
    keywords: 'licoreria licores licor deposito cerveza cervezas ron whisky vodka vino anis aguardiente tequila refrescos hielo bebidas bodegon distribuidora caja six pack fria frias al mayor mayorista detal envases retornables vacios gaveras deposito combos fiado credito delivery pedidos',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['box', 'Unidad, six-pack o caja', 'Cada uno con su precio y lector de código.'],
      ['droplet', 'Fría o al tiempo', 'Recargo por frío y precio al mayor.'],
      ['layers', 'Envases retornables', 'Depósito, préstamo y quién te debe vacíos.'],
      ['cart', 'Combos y pedidos', 'Ron + refresco + hielo y catálogo en línea.'],
      ['card', 'Fiado con límite', 'Saldo por cliente y cobro en un toque.'],
      ['whatsapp', 'Clientes que vuelven', 'Oferta por WhatsApp al que dejó de venir.']
    ],
    compare: { ventas: 'Unidad, six-pack o caja', inventario: 'Por lotes', agenda: false, whatsapp: true, qr: 'Tarjeta del cliente', especial: 'Retornables y fiado' }
  },
  {
    id: 'sano-condominio',
    name: ['Sano', 'Condominio'],
    status: 'disponible',
    category: 'Inmobiliaria',
    tagline: 'Recibos por alícuota, cobranza en dólares y bolívares, portal del propietario y votaciones para condominios.',
    description:
      'SanoCondominio administra tu condominio sin hojas de cálculo. Cargas los gastos del mes con un toque por categoría y emites todos los recibos en un clic, repartidos por alícuota con honorarios, fondo de reserva, cuotas especiales y mora. Cobras en dólares o bolívares a la tasa BCV del día, confirmas los pagos que reportan los propietarios y les recuerdas su deuda por WhatsApp. Cada propietario tiene su portal para ver sus recibos, reportar su pago, leer los comunicados, votar en las asambleas y reservar el salón de fiestas. También fondos, solicitudes, constancias de solvencia y reportes para la junta.',
    color: ['#2dd4bf', '#0e7490'],
    url: 'https://sano-condominio.web.app/',
    video: 'https://sano-condominio.web.app/tutorial/sano-condominio-tutorial.mp4',
    minutes: 6,
    rubros: ['Junta de condominio', 'Administradora de condominios', 'Edificio residencial', 'Conjunto residencial', 'Centro comercial'],
    keywords: 'condominio condominios junta administradora administracion edificio residencias conjunto residencial urbanizacion torre apartamento propietario inquilino alicuota recibo recibos cuota gastos comunes fondo de reserva cuota especial mora moroso morosos cobranza pago movil bcv solvencia estado de cuenta asamblea votacion comunicado reserva salon parrillera',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['book', 'Recibos por alícuota', 'Fondo de reserva, cuotas especiales y mora.'],
      ['cash', 'Cobranza en $ y Bs', 'Tasa BCV del día y pagos reportados.'],
      ['whatsapp', 'Morosos por WhatsApp', 'Recordatorio con su deuda y su portal.'],
      ['qr', 'Portal del propietario', 'Recibos, reportar pago y comunicados.'],
      ['users', 'Votaciones', 'Ponderadas por alícuota con quórum y acta.'],
      ['calendar', 'Áreas comunes', 'Reservas sin choques y con su cobro.']
    ],
    compare: { ventas: 'Recibos y cobranza', inventario: false, agenda: 'Reservas de áreas', whatsapp: true, qr: 'Portal del propietario', especial: 'Alícuotas y votaciones' }
  },
  {
    id: 'sano-academia',
    name: ['Sano', 'Academia'],
    status: 'disponible',
    category: 'Educación',
    tagline: 'Horarios, asistencia, notas, mensualidades y portales del alumno y del profesor para academias y cursos.',
    description:
      'SanoAcademia lleva tu academia o instituto de cursos en orden. Armas el horario semanal y el sistema te avisa si un aula o un profesor choca. Pasas la lista con un toque y avisas por WhatsApp al representante de quien faltó, cargas las notas con su plan de evaluación y el promedio se calcula solo. Generas las mensualidades del mes en un clic con becas, descuento por hermanos y recargo por mora, y cobras en dólares o bolívares a la tasa BCV del día. Cada alumno tiene su portal para ver su horario, sus notas y su asistencia y reportar su pago; cada profesor pasa la lista y carga las notas desde su teléfono, y su pago se calcula con las clases dictadas. También inscripción en línea con cupos, certificados con QR verificable y reportes.',
    color: ['#818cf8', '#7c3aed'],
    url: 'https://sano-academia.web.app/',
    video: 'https://sano-academia.web.app/tutorial/sano-academia-tutorial.mp4',
    minutes: 6,
    rubros: ['Academia de idiomas', 'Escuela de música', 'Academia de computación', 'Escuela de danza y arte', 'Preuniversitario y tutorías', 'Instituto de cursos y oficios'],
    keywords: 'academia academias instituto escuela cursos curso clases taller talleres idiomas ingles musica guitarra piano canto danza baile ballet arte dibujo pintura computacion programacion robotica preuniversitario tutorias refuerzo escolar oratoria cocina reposteria belleza maquillaje oficios deporte natacion futbol alumno alumnos estudiante representante profesor profesores docente horario asistencia lista notas boletin calificaciones mensualidad mensualidades inscripcion matricula beca certificado constancia carnet',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['calendar', 'Horario sin choques', 'Aulas y profesores, por día y semana.'],
      ['check', 'Asistencia en un toque', 'Y aviso al representante si faltó.'],
      ['book', 'Notas y boletines', 'Plan de evaluación y promedio automático.'],
      ['cash', 'Mensualidades en $ y Bs', 'Becas, hermanos y mora; tasa BCV.'],
      ['qr', 'Portal del alumno', 'Horario, notas, pagos y avisos.'],
      ['users', 'Portal del profesor', 'Pasa lista y carga notas en su teléfono.']
    ],
    compare: { ventas: 'Mensualidades', inventario: false, agenda: 'Horario de clases', whatsapp: true, qr: 'Portal y certificados', especial: 'Asistencia y notas' }
  },
  {
    id: 'sano-optica',
    name: ['Sano', 'Óptica'],
    status: 'disponible',
    category: 'Salud',
    tagline: 'Examen visual, órdenes de laboratorio, abonos, monturas y portal del paciente para ópticas.',
    description:
      'SanoÓptica lleva tu óptica en orden. Registras el examen visual con la fórmula de cada ojo y el sistema valida los valores, transpone el cilindro y sugiere el diagnóstico y el cristal. Armas la orden con la montura de tu vitrina, los cristales y tratamientos de tu lista de precios y el laboratorio, y la sigues paso a paso hasta el control de calidad y la entrega, sin entregar con saldo pendiente. Cobras abonos en dólares o en bolívares a la tasa del BCV, llevas tus monturas con su margen y existencia mínima, vendes lentes de sol y de contacto en el mostrador, y tus pacientes ven el estado de sus lentes, su fórmula y su saldo en su portal, reportan su pago y piden su cita en línea.',
    color: ['#38bdf8', '#0369a1'],
    url: 'https://sano-optica.web.app/',
    video: 'https://sano-optica.web.app/tutorial/sano-optica-tutorial.mp4',
    minutes: 6,
    rubros: ['Óptica', 'Optometrista', 'Consultorio de optometría', 'Venta de lentes de sol', 'Lentes de contacto', 'Laboratorio óptico'],
    keywords: 'optica opticas optometria optometrista oftalmologia lentes anteojos gafas lentes de sol lentes de contacto monturas armazones cristales micas progresivos bifocales antirreflejo fotocromatico blue filtro luz azul examen visual vista graduacion formula receta miopia astigmatismo presbicia laboratorio optico',
    moneda: 'La moneda de tu país',
    screens: [],
    features: [
      ['eye', 'Examen visual', 'Fórmula OD/OI validada y con QR.'],
      ['glasses', 'Órdenes de lentes', 'Montura, cristales y tratamientos.'],
      ['flask', 'Laboratorio y calidad', 'Fecha prometida y días reales.'],
      ['cash', 'Abonos en $ y Bs', 'Saldo al retirar; tasa BCV.'],
      ['box', 'Monturas', 'Marca, medidas, margen y existencia.'],
      ['qr', 'Portal del paciente', 'Sus lentes paso a paso y su cita.']
    ],
    compare: { ventas: 'Órdenes y abonos', inventario: 'Monturas', agenda: true, whatsapp: true, qr: 'Fórmula y portal', especial: 'Examen y laboratorio' }
  }
];
// Lo que incluyen todos los software Sano (sección "Todos incluyen")
export const COMMON = [
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
