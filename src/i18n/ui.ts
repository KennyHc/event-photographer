export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.title': 'Kenny He — Event Photography',
    'site.description':
      'Documentary event photography in Madrid and across Spain — weddings, baptisms, private and corporate celebrations.',
    'site.tagline': 'Event photography in Madrid & across Spain',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.switchTo': 'ES',
    'home.intro':
      'Documentary, unobtrusive event photography — natural moments, told honestly.',
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
      "I'm Kenny, a documentary-minded event photographer based in Madrid, working across Spain and for destination events further afield.",
    'about.bio.p2':
      'I photograph weddings, baptisms and private celebrations the way they actually happen — quietly, from the edges, without staged interruptions. My aim is a gallery that feels like the day felt, not a performance of it.',
    'about.bio.p3':
      "I'm available to travel for your event, in Spain or abroad.",
    'about.howIWork': 'How I work',
    'about.step1.title': 'Inquiry',
    'about.step1.body':
      "Tell me the date, location and shape of your event, and I'll confirm availability and the right coverage for you.",
    'about.step2.title': 'Coverage',
    'about.step2.body':
      'On the day, I work quietly and move with the event — documenting as it unfolds, without staged interruptions.',
    'about.step3.title': 'Delivery',
    'about.step3.body':
      'A curated, fully edited gallery arrives within a few weeks, ready to share and keep.',
    'contact.heading': 'Contact',
    'contact.intro':
      "Include the date, location and type of event, and I'll get back to you shortly.",
    'contact.email': 'Email',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.based': 'Based in Madrid · Available across Spain and for destination events',
    '404.heading': 'Page not found',
    '404.body': "The page you're looking for doesn't exist or has moved.",
    '404.home': 'Back to home',
    'footer.rights': 'All rights reserved.',
  },
  es: {
    'site.title': 'Kenny He — Fotografía de eventos',
    'site.description':
      'Fotografía documental de eventos en Madrid y toda España — bodas, bautizos, celebraciones privadas y corporativas.',
    'site.tagline': 'Fotografía de eventos en Madrid y toda España',
    'nav.work': 'Trabajos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.switchTo': 'EN',
    'home.intro':
      'Fotografía de eventos documental y discreta — momentos naturales, contados con honestidad.',
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
      'Soy Kenny, fotógrafo de eventos con mirada documental, con base en Madrid y disponible para trabajar en toda España y en eventos de destino.',
    'about.bio.p2':
      'Fotografío bodas, bautizos y celebraciones privadas tal y como suceden — en silencio, desde los márgenes, sin interrupciones ni posados forzados. Mi objetivo es una galería que se sienta como se sintió el día, no como una representación de él.',
    'about.bio.p3': 'Estoy disponible para viajar a tu evento, dentro o fuera de España.',
    'about.howIWork': 'Cómo trabajo',
    'about.step1.title': 'Consulta',
    'about.step1.body':
      'Cuéntame la fecha, el lugar y la forma de tu evento, y te confirmaré disponibilidad y la cobertura adecuada.',
    'about.step2.title': 'Cobertura',
    'about.step2.body':
      'El día del evento trabajo en silencio y me muevo con él — documentando lo que ocurre, sin interrupciones ni posados.',
    'about.step3.title': 'Entrega',
    'about.step3.body':
      'Una galería editada y seleccionada con cuidado llega en pocas semanas, lista para compartir y conservar.',
    'contact.heading': 'Contacto',
    'contact.intro':
      'Incluye la fecha, el lugar y el tipo de evento, y te responderé en breve.',
    'contact.email': 'Correo',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.based': 'Con base en Madrid · Disponible en toda España y para eventos de destino',
    '404.heading': 'Página no encontrada',
    '404.body': 'La página que buscas no existe o se ha movido.',
    '404.home': 'Volver al inicio',
    'footer.rights': 'Todos los derechos reservados.',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
