import type { Dict } from "./types";

const es: Dict = {
  meta: {
    title: "Spbcode — Desarrollo web",
    description:
      "Desarrollador web: sitios web a medida, portfolios, landing pages y gestión de turnos online para profesionales y pequeños negocios.",
    jobTitle: "Desarrollador web",
  },
  nav: {
    skip: "Ir al contenido",
    langLabel: "Lingua / Idioma",
    menu: "Menú principal",
    menuOpen: "Abrir el menú",
    menuClose: "Cerrar el menú",
    services: "Servicios",
    works: "Trabajos",
    method: "Método",
    about: "Sobre mí",
    contact: "Contacto",
  },
  hero: {
    eyebrow: "Desarrollador web",
    titleBefore: "Sitios y aplicaciones web ",
    titleEm: "a medida",
    titleAfter: " para profesionales y pequeños negocios.",
    sub: "Desde la idea hasta la publicación: desarrollo y diseño en las manos de una sola persona, con el mismo cuidado tanto para el código como para el aspecto.",
    cta: "Hablemos",
    note: "Respuesta en 24–48 horas",
  },
  services: {
    kicker: "// Servicios",
    title: "Qué hago",
    lead: "Sitios web dinámicos, pensados para quien trabaja por su cuenta o gestiona un pequeño negocio.",
    featuredTag: "Servicio principal",
    items: [
      {
        title: "Webapp para la gestión de turnos y reservas",
        text: "Calendario online, disponibilidad en tiempo real, confirmaciones automáticas y un panel para manejar tu agenda de forma autónoma.",
      },
      {
        title: "Portfolio y sitios de presentación",
        text: "Un sitio que presenta tu trabajo o tu pasión con una identidad propia, de manera rápida y eficaz también en el celular.",
      },
      {
        title: "Landing page",
        text: "Una página clara y enfocada para presentar un servicio o una campaña y convertir visitas en contactos. El mejor modo de atraer nuevos clientes.",
      },
    ],
    note: "Todo a medida, sin plantillas genéricas, y disponible en varios idiomas.",
    demo: { day: "mar 14", confirmed: "Turno confirmado" },
  },
  works: {
    kicker: "// Trabajos",
    title: "Trabajos recientes",
    lead: "Algunos proyectos realizados.",
    items: [
      {
        title: "Estudio de fisioterapia",
        text: "Un sistema de reservas online que reemplaza el intercambio de llamadas y mensajes: los pacientes eligen un turno libre y el estudio maneja la agenda desde un panel. Los profesionales controlan los turnos directamente desde su propio calendario en tiempo real.",
        tags: ["Reservas online", "Area reservada", "Confirmaciones automáticas"],
      },
      {
        title: "Portfolio para una artista",
        text: "Un sitio personal con identidad visual propia, pensado para presentar su trabajo detalladamente. Galería de imágenes, biografía y un formulario de contacto para recibir solicitudes de colaboraciones y trabajos.",
        tags: ["Identidad visual", "Galería", "Formulario de contacto"],
      },
      {
        title: "Sitio para un evento",
        text: "Un sitio bilingüe con confirmación de asistencia online (RSVP) para un evento privado y un panel de gestión para que los organizadores puedan manejar todos los detalles.",
        tags: ["Bilingüe", "RSVP online", "Panel de administración"],
      },
    ],
    demo: {
      note: "Demo con datos ficticios",
      booking: {
        title: "Reservá tu turno",
        sub: "Elegí una fecha para ver los horarios disponibles.",
        days: ["Lu", "Ma", "Mi", "Ju", "Vi"],
        book: "Reservar",
        name: "Nombre y apellido",
        cancel: "Cancelar",
        confirm: "Confirmar",
        done: "Turno confirmado",
        agenda: "Agenda",
        agendaDay: "mié 21",
        confirmed: "Confirmado",
        isNew: "Nuevo",
        free: "libre",
      },
      gallery: { nav: ["Inicio", "Sobre mí", "Repertorio", "Galería"], title: "Galería", filters: ["Todo", "Actuaciones", "Ensayos", "Videos"] },
      rsvp: { title: "Confirmá tu asistencia", name: "Nombre y apellido", attend: "¿Asistís?", yes: "Sí", submit: "Confirmar", thanks: "¡Gracias por confirmar! ♥" },
    },
  },
  method: {
    kicker: "// Método",
    title: "Cómo trabajo",
    steps: [
      { title: "Charla inicial", text: "Escucho qué necesitás y cómo trabajás." },
      { title: "Propuesta", text: "Te envío una propuesta clara, con tiempos y presupuesto a medida." },
      { title: "Desarrollo", text: "Construyo el proyecto y te muestro los avances, para que puedas decidir y elegir lo que mejor se adapte a tus necesidades." },
      { title: "Entrega y soporte", text: "Publico todo y quedo a disposición para cambios y dudas." },
    ],
  },
  about: {
    kicker: "// Sobre mí",
    title: "Sobre mí",
    paragraphs: [
      "Soy Santiago, desarrollador web en Milán. Trabajo en desarrollo fullstack y diseño y me ocupo de cada fase del proyecto, desde la idea hasta la publicación.",
      "Hablo italiano, español e inglés y hago sitios en los tres idiomas.",
    ],
    photoAlt: "Retrato de Santiago",
  },
  contact: {
    kicker: "// Contacto",
    title: "Hablemos de tu proyecto",
    lead: "Contame en pocas líneas qué necesitás: el resto lo vemos juntos.",
    expectation: "Te respondo en 24–48 horas.",
    altEmail: "¿Preferís el email? Escribime a",
    fields: { name: "Nombre", email: "Email", need: "¿Qué necesitás?", message: "Mensaje" },
    needPlaceholder: "Elegí una opción",
    needs: {
      appointments: "Gestión de turnos",
      portfolio: "Portfolio",
      landing: "Landing page",
      other: "Otra cosa",
    },
    honeypot: "No completes este campo",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    status: {
      ok: "¡Gracias! Recibí tu mensaje: te respondo en 24–48 horas.",
      invalid: "Revisá los campos marcados y probá de nuevo.",
      rate: "Enviaste demasiados mensajes. Probá de nuevo en unos minutos.",
      error: "Algo salió mal. Probá de nuevo o escribime directamente por email.",
    },
  },
  footer: {
    rights: "Desarrollo web a medida",
  },
};

export default es;
