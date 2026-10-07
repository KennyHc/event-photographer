export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.title': 'Kenny He · Event Photography',
    'site.description':
      'Documentary event photography in Madrid and across Spain: weddings, baptisms, private and corporate celebrations.',
    'site.tagline': 'Event photography in Madrid & across Spain',
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.switchTo': 'ES',
    'home.intro':
      'Documentary, unobtrusive event photography. Natural moments, told honestly.',
    'home.scroll': 'Scroll',
    'home.selectedWork': 'Selected work',
    'home.servicesHeading': 'Services',
    'service.weddings': 'Weddings',
    'service.baptisms': 'Baptisms & communions',
    'service.private': 'Private celebrations',
    'service.corporate': 'Corporate events',
    'service.inquire': 'Inquire for a quote',
    'home.cta.heading': "Planning an event? Let's talk.",
    'home.cta.button': 'Get in touch',
    'work.heading': 'Work',
    'work.intro': 'A selection of recent events, told in full.',
    'work.viewStory': 'View story',
    'event.location': 'Location',
    'event.date': 'Date',
    'event.gallery': 'Gallery',
    'event.testimonial': 'What they said',
    'event.prev': 'Previous story',
    'event.next': 'Next story',
    'event.back': 'Back to all work',
    'event.galleryAlt': 'photo',
    'about.heading': 'About',
    'about.kicker': 'Based in Madrid',
    'about.bio.p1':
      "I'm Kenny, an event photographer based in Madrid. I shoot weddings, baptisms and private celebrations across Spain.",
    'about.bio.p2':
      "I was born in Peru and lived in China and Canada before settling in Spain. I speak Spanish, English and Mandarin, so I can work comfortably with families and guests from different backgrounds.",
    'about.bio.p3':
      'Before any event, I take the time to understand what matters to you. On the day, I let moments happen as naturally as they can, without staging or interruptions.',
    'about.services.prompt': "Want the details on packages, timing and what's included?",
    'about.services.cta': 'See Services',
    'contact.heading': 'Contact',
    'contact.intro':
      "Include the date, location and type of event, and I'll get back to you shortly.",
    'contact.email': 'Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.based': 'Based in Madrid · Available across Spain',
    '404.heading': 'Page not found',
    '404.body': "The page you're looking for doesn't exist or has moved.",
    '404.home': 'Back to home',
    'footer.rights': 'All rights reserved.',
    'services.eyebrow': 'What to expect',
    'services.heading': 'Services',
    'services.packages.heading': 'Packages',
    'services.package1.name': 'Essential',
    'services.package1.coverage': 'Up to 2 hours',
    'services.package1.idealFor':
      'Ideal for baptisms, communions, birthdays and small gatherings.',
    'services.package2.name': 'Half day',
    'services.package2.coverage': 'Up to 5 hours',
    'services.package2.idealFor':
      'Ideal for ceremonies with a reception, larger celebrations and corporate events.',
    'services.package3.name': 'Full day',
    'services.package3.coverage': 'Up to 10 hours',
    'services.package3.idealFor': 'Ideal for weddings, from getting ready to the party.',
    'services.quote': 'Request a quote',
    'services.included.heading': 'Included in every package',
    'services.included.item1': 'Hand-picked photos, each edited for colour and light',
    'services.included.item2':
      'A handful of edited highlights (sneak peek) within 48 hours',
    'services.included.item3': 'The full edited gallery in high resolution within 1 week',
    'services.included.item4':
      'Delivered through a private Google Drive or WeTransfer link',
    'services.included.item5': 'Files ready for printing and sharing',
    'services.how.heading': 'How it works',
    'services.how.step1.title': 'Get in touch',
    'services.how.step1.body': 'Send the date, place and type of event.',
    'services.how.step2.title': 'Plan',
    'services.how.step2.body':
      'A short call to go over the schedule and the people and moments that matter.',
    'services.how.step3.title': 'The day',
    'services.how.step3.body': 'I work discreetly and document things as they happen.',
    'services.how.step4.title': 'Delivery',
    'services.how.step4.body': 'Sneak peek in 48 hours, full gallery within 1 week.',
    'services.extras.heading': 'Extras',
    'services.extras.travel':
      'Travel across Spain. Based in Madrid; travel elsewhere is quoted separately.',
    'services.extras.prints': 'Prints and albums on request.',
    'services.faq.heading': 'FAQ',
    'services.faq.q1': 'Do you travel?',
    'services.faq.a1': 'Yes, anywhere in Spain. Travel outside Madrid is quoted separately.',
    'services.faq.q2': 'How many photos will I receive?',
    'services.faq.a2':
      'It depends on the length of the event. You get every strong frame, edited, with no near-duplicates to pad the count.',
    'services.faq.q3': 'Do you deliver RAW files?',
    'services.faq.a3': 'No, I deliver edited high-resolution JPEGs.',
    'services.faq.q4': 'How do I book?',
    'services.faq.a4':
      "Send me a message with your date and event details and I'll confirm availability.",
  },
  es: {
    'site.title': 'Kenny He · Fotografía de eventos',
    'site.description':
      'Fotografía documental de eventos en Madrid y toda España: bodas, bautizos, celebraciones privadas y corporativas.',
    'site.tagline': 'Fotografía de eventos en Madrid y toda España',
    'nav.work': 'Trabajos',
    'nav.services': 'Servicios',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.switchTo': 'EN',
    'home.intro':
      'Fotografía de eventos documental y discreta. Momentos naturales, contados con honestidad.',
    'home.scroll': 'Desplázate',
    'home.selectedWork': 'Trabajos seleccionados',
    'home.servicesHeading': 'Servicios',
    'service.weddings': 'Bodas',
    'service.baptisms': 'Bautizos y comuniones',
    'service.private': 'Celebraciones privadas',
    'service.corporate': 'Eventos corporativos',
    'service.inquire': 'Consulta disponibilidad y presupuesto',
    'home.cta.heading': '¿Organizando un evento? Hablemos.',
    'home.cta.button': 'Ponte en contacto',
    'work.heading': 'Trabajos',
    'work.intro': 'Una selección de eventos recientes, contados en su totalidad.',
    'work.viewStory': 'Ver reportaje',
    'event.location': 'Ubicación',
    'event.date': 'Fecha',
    'event.gallery': 'Galería',
    'event.testimonial': 'Lo que dijeron',
    'event.prev': 'Reportaje anterior',
    'event.next': 'Siguiente reportaje',
    'event.back': 'Volver a trabajos',
    'event.galleryAlt': 'foto',
    'about.heading': 'Sobre mí',
    'about.kicker': 'Con base en Madrid',
    'about.bio.p1':
      'Soy Kenny, fotógrafo de eventos con base en Madrid. Hago bodas, bautizos y celebraciones privadas en toda España.',
    'about.bio.p2':
      'Nací en Perú y viví en China y Canadá antes de instalarme en España. Hablo español, inglés y mandarín, así que puedo trabajar con familias e invitados de distintos orígenes.',
    'about.bio.p3':
      'Antes de cada evento, me tomo el tiempo de entender qué es importante para ti. El día del evento, dejo que los momentos ocurran de la forma más natural posible, sin posados ni interrupciones.',
    'about.services.prompt': '¿Quieres conocer los paquetes, los plazos y lo que incluye cada uno?',
    'about.services.cta': 'Ver Servicios',
    'contact.heading': 'Contacto',
    'contact.intro':
      'Incluye la fecha, el lugar y el tipo de evento, y te responderé en breve.',
    'contact.email': 'Correo',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.based': 'Con base en Madrid · Disponible en toda España',
    '404.heading': 'Página no encontrada',
    '404.body': 'La página que buscas no existe o se ha movido.',
    '404.home': 'Volver al inicio',
    'footer.rights': 'Todos los derechos reservados.',
    'services.eyebrow': 'Qué esperar',
    'services.heading': 'Servicios',
    'services.packages.heading': 'Paquetes',
    'services.package1.name': 'Esencial',
    'services.package1.coverage': 'Hasta 2 horas',
    'services.package1.idealFor':
      'Ideal para bautizos, comuniones, cumpleaños y reuniones pequeñas.',
    'services.package2.name': 'Media jornada',
    'services.package2.coverage': 'Hasta 5 horas',
    'services.package2.idealFor':
      'Ideal para ceremonias con convite, celebraciones más grandes y eventos corporativos.',
    'services.package3.name': 'Jornada completa',
    'services.package3.coverage': 'Hasta 10 horas',
    'services.package3.idealFor': 'Ideal para bodas, desde los preparativos hasta la fiesta.',
    'services.quote': 'Pedir presupuesto',
    'services.included.heading': 'Incluido en todos los paquetes',
    'services.included.item1': 'Fotos seleccionadas una a una y editadas en color y luz',
    'services.included.item2':
      'Un puñado de fotos destacadas editadas (avance) en 48 horas',
    'services.included.item3': 'La galería completa editada en alta resolución en 1 semana',
    'services.included.item4':
      'Entrega mediante un enlace privado de Google Drive o WeTransfer',
    'services.included.item5': 'Archivos listos para imprimir y compartir',
    'services.how.heading': 'Cómo funciona',
    'services.how.step1.title': 'Contacto',
    'services.how.step1.body': 'Envíame la fecha, el lugar y el tipo de evento.',
    'services.how.step2.title': 'Planificación',
    'services.how.step2.body':
      'Una llamada breve para repasar el horario y las personas y momentos importantes.',
    'services.how.step3.title': 'El día',
    'services.how.step3.body': 'Trabajo con discreción y documento lo que ocurre.',
    'services.how.step4.title': 'Entrega',
    'services.how.step4.body': 'Avance en 48 horas, galería completa en 1 semana.',
    'services.extras.heading': 'Extras',
    'services.extras.travel':
      'Desplazamientos por toda España. Con base en Madrid; los desplazamientos fuera se presupuestan aparte.',
    'services.extras.prints': 'Impresiones y álbumes a petición.',
    'services.faq.heading': 'Preguntas frecuentes',
    'services.faq.q1': '¿Te desplazas?',
    'services.faq.a1':
      'Sí, a cualquier lugar de España. Los desplazamientos fuera de Madrid se presupuestan por separado.',
    'services.faq.q2': '¿Cuántas fotos recibiré?',
    'services.faq.a2':
      'Depende de la duración del evento. Recibes cada foto que funciona, editada y sin duplicados para inflar el número.',
    'services.faq.q3': '¿Entregas los archivos RAW?',
    'services.faq.a3': 'No, entrego JPEG en alta resolución ya editados.',
    'services.faq.q4': '¿Cómo reservo?',
    'services.faq.a4':
      'Envíame un mensaje con tu fecha y los detalles del evento y te confirmaré disponibilidad.',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
