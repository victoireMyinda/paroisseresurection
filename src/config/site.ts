export const siteConfig = {
  name: 'Paroisse Catholique de la Résurrection',
  shortName: 'Paroisse de la Résurrection',
  description:
    'Une communauté de foi, d\'espérance et de charité au cœur de Lemba Salongo, Kinshasa (RDC).',
  url: 'https://paroisseresurrection-kinshasa.org',
  locale: 'fr_CD',
  address: {
    street: 'Quartier Salongo-Sud',
    commune: 'Commune de Lemba',
    city: 'Kinshasa',
    country: 'République Démocratique du Congo',
    full: 'Quartier Salongo-Sud, Commune de Lemba, Kinshasa, RDC',
  },
  contact: {
    phone: '+243 81 664 4420',
    phoneDisplay: '081 664 4420',
    email: 'contact@paroisseresurrection-kinshasa.org',
    officeHours: 'Lundi – Vendredi : 8h00 – 17h00 | Samedi : 8h00 – 12h00',
  },
  whatsapp: {
    number: '243816644420',
    message:
      'Bonjour, je souhaite obtenir des informations concernant la Paroisse de la Résurrection.',
  },
  social: {
    facebook: 'https://facebook.com/paroisseresurrection',
    whatsapp: 'https://wa.me/243816644420',
    youtube: 'https://youtube.com/@paroisseresurrection',
    instagram: 'https://instagram.com/paroisseresurrection',
    tiktok: 'https://tiktok.com/@paroisseresurrection',
  },
  live: {
    youtube: 'https://youtube.com/@paroisseresurrection/live',
    facebook: 'https://facebook.com/paroisseresurrection/live',
  },
  featuredVideo: {
    id: 'FxMDSUhFgSk',
    title: 'Célébration à la Paroisse de la Résurrection',
    watchUrl: 'https://www.youtube.com/watch?v=FxMDSUhFgSk',
    embedUrl: 'https://www.youtube.com/embed/FxMDSUhFgSk',
    thumbnail: 'https://img.youtube.com/vi/FxMDSUhFgSk/hqdefault.jpg',
  },
  map: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d15.28!3d-4.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGVtYmEsIEtpbnNoYXNh!5e0!3m2!1sfr!2scd!4v1',
    link: 'https://maps.google.com/?q=Lemba+Salongo+Kinshasa',
  },
} as const

export const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/commissions', label: 'Commissions' },
  { href: '/annonces-hebdomadaires', label: 'Annonces hebdo.' },
  { href: '/annonces', label: 'Toutes les annonces' },
  { href: '/dons', label: 'Dons' },
  { href: '/medias', label: 'Médias' },
  { href: '/contact', label: 'Contact' },
] as const
