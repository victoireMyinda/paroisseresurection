import type { SiteContent } from '@/i18n/content/types'
import { churchFr } from '@/i18n/content/fr/church'
import commissionsData from '@/data/commissions.json'
import announcementsData from '@/data/announcements.json'
import weeklyScheduleData from '@/data/weekly-schedule.json'
import donationsData from '@/data/donations.json'
import parishData from '@/data/parish.json'
import liveData from '@/data/live.json'
import liturgyData from '@/data/liturgy.json'
import { parishImages } from '@/assets/parish-images'

const dayLabels: Record<string, string> = {
  lundi: 'Lundi',
  mardi: 'Mardi',
  mercredi: 'Mercredi',
  jeudi: 'Jeudi',
  vendredi: 'Vendredi',
  samedi: 'Samedi',
  dimanche: 'Dimanche',
}

export const frContent: SiteContent = {
  parish: {
    presentation:
      'La Paroisse Catholique de la Résurrection est une communauté vivante au cœur de Lemba Salongo, Kinshasa. Fidèle à la mission de l\'Église, elle accueille, forme et envoie chaque fidèle à témoigner de l\'Évangile dans la joie et la charité.',
    historySummary:
      'Née du dynamisme pastoral de Lemba, notre paroisse porte le nom de la Résurrection du Christ — signe d\'espérance pour Salongo-Sud et toute la capitale congolaise.',
    history: {
      title: 'Historique de la paroisse',
      sections: parishData.history.sections.map((s) => ({
        heading: s.title,
        paragraphs: [s.content],
      })),
    },
    curates: [
      {
        name: 'Abbé Joseph Mwamba',
        period: '1985 – 1998',
        achievements: [
          'Fondation de la première chapelle de Salongo-Sud',
          'Mise en place des premières commissions paroissiales',
          'Lancement de la catéchèse structurée pour enfants et adultes',
        ],
        image: parishImages.eglise,
      },
      {
        name: 'Abbé Pierre Kabasele',
        period: '1998 – 2012',
        achievements: [
          'Construction de l\'église actuelle et du presbytère',
          'Création de la chorale paroissiale et des groupes de mouvements',
          'Développement des œuvres caritatives en faveur des familles vulnérables',
        ],
        image: parishImages.paroisse,
      },
      {
        name: 'Abbé Emmanuel Nkulu',
        period: '2012 – 2020',
        achievements: [
          'Rénovation de la grotte mariale et aménagement des espaces de prière',
          'Intensification de l\'évangélisation des jeunes et des familles',
          'Partenariats avec les écoles catholiques du quartier',
        ],
        image: parishImages.grotte,
      },
      {
        name: 'Ndeko Jean Delly',
        period: '2020 – aujourd\'hui',
        achievements: [
          'Digitalisation de la communication paroissiale et messes en direct',
          'Renforcement de la pastorale synodale et des commissions',
          'Lancement des grands travaux de développement paroissial',
        ],
        image: parishImages.eglise,
      },
    ],
    groups: [
      {
        name: 'Légion de Marie',
        mission: 'Dévotion mariale, prière et service apostolique sous la protection de la Sainte Vierge.',
        activities: 'Réunions hebdomadaires, visite aux malades, distribution de médailles et rosaries.',
        responsible: 'Responsable à confirmer',
      },
      {
        name: 'Renouveau Charismatique',
        mission: 'Vivre les dons du Saint-Esprit au service de l\'Église et de l\'évangélisation.',
        activities: 'Veillées de louange, partage de la Parole, intercession et formation.',
        responsible: 'Responsable à confirmer',
      },
      {
        name: 'Scouts catholiques',
        mission: 'Éducation intégrale des jeunes par le scoutisme selon les valeurs chrétiennes.',
        activities: 'Camps, marches, service communautaire et formation spirituelle.',
        responsible: 'Chef de groupe à confirmer',
      },
      {
        name: 'Mouvement des Enfants et Jeunes (MEJ)',
        mission: 'Accompagner enfants et adolescents dans la découverte de leur vocation baptismale.',
        activities: 'Activités ludiques, retraites, célébrations et engagement solidaire.',
        responsible: 'Responsable MEJ à confirmer',
      },
      {
        name: 'Mouvement des Foyers de Charité',
        mission: 'Vivre l\'Évangile en communauté et témoigner de la charité fraternelle.',
        activities: 'Retraites, partage fraternel, service aux pauvres et aux malades.',
        responsible: 'Responsable à confirmer',
      },
      {
        name: 'Mouvement Eucharistique des Enfants',
        mission: 'Aider les enfants à découvrir et aimer Jésus présent dans l\'Eucharistie.',
        activities: 'Adoration enfantine, catéchèse eucharistique et célébrations adaptées.',
        responsible: 'Responsable à confirmer',
      },
    ],
    parishLife: parishData.parishLife,
    curateMessage: parishData.curateMessage,
    liturgySchedule: parishData.liturgySchedule,
  },
  events: {
    works: [
      {
        id: 'w1',
        title: 'Rénovation de la grotte mariale',
        status: 'completed',
        progress: 100,
        description:
          'Réhabilitation complète de l\'espace de dévotion mariale avec nouvel éclairage, aménagement paysager et restauration des statues.',
        goal: 'Offrir un lieu de recueillement digne pour la prière communautaire et individuelle.',
        image: parishImages.nouvellegrotte,
      },
      {
        id: 'w2',
        title: 'Extension de la salle paroissiale',
        status: 'in_progress',
        progress: 65,
        description:
          'Agrandissement de la salle polyvalente pour accueillir les formations, réunions des commissions et activités pastorales.',
        goal: 'Capacité de 300 personnes avec équipements modernes (son, projection, accessibilité).',
        image: parishImages.paroisse,
      },
      {
        id: 'w3',
        title: 'Système solaire et éclairage du parvis',
        status: 'in_progress',
        progress: 40,
        description:
          'Installation de panneaux solaires et éclairage du parvis pour les veillées et célébrations nocturnes.',
        goal: 'Autonomie énergétique partielle et sécurité des fidèles.',
        image: parishImages.cloche2,
      },
      {
        id: 'w4',
        title: 'Centre de formation biblique',
        status: 'planned',
        progress: 10,
        description:
          'Projet de construction d\'un centre dédié à la formation biblique, catéchétique et aux retraites spirituelles.',
        goal: 'Répondre au besoin croissant de formation des adultes et des catéchistes.',
        image: parishImages.fidele,
      },
    ],
  },
  liturgy: {
    season: liturgyData.homily.liturgicalDay,
    color: 'Vert',
    readings: [
      {
        type: 'Première lecture',
        reference: 'Ac 2, 14. 36-41',
        text: 'Pierre, debout avec les onze, éleva la voix et leur dit : « Que toute la maison d\'Israël sache donc avec certitude que Dieu a fait Seigneur et Christ ce Jésus que vous avez crucifié. »',
      },
      {
        type: 'Deuxième lecture',
        reference: '1 P 2, 4-9',
        text: 'Approchez-vous du Seigneur, pierre vivante, rejetée par les hommes mais choisie et précieuse aux yeux de Dieu.',
      },
    ],
    gospel: {
      reference: 'Jn 10, 1-10',
      text: 'En vérité, en vérité, je vous le dis : celui qui n\'entre pas par la porte dans la bergerie des moutons, mais qui escalade par ailleurs, c\'est un voleur et un brigand.',
    },
    psalm: {
      reference: 'Ps 23',
      text: 'Le Seigneur est mon berger : je ne manque de rien. Il me fait reposer dans de verts pâturages.',
    },
    saint: {
      name: liturgyData.saintOfDay.name,
      feast: liturgyData.saintOfDay.feast,
      meditation: liturgyData.saintOfDay.excerpt,
    },
    homily: {
      title: liturgyData.homily.title,
      liturgicalDay: liturgyData.homily.liturgicalDay,
      heading: liturgyData.homily.heading,
      excerpt: liturgyData.homily.excerpt,
      content: liturgyData.homily.content,
    },
  },
  announcements: announcementsData as SiteContent['announcements'],
  announcementCategories: {
    retraites: 'Retraites',
    veillees: 'Veillées de prière',
    bans: 'Bans de mariage',
    baptemes: 'Baptêmes',
    evenements: 'Événements',
    formations: 'Formations',
    communiques: 'Communiqués',
    deces: 'Décès',
    remerciements: 'Remerciements',
  },
  commissions: commissionsData as SiteContent['commissions'],
  weeklySchedule: Object.entries(weeklyScheduleData).map(([key, activities]) => ({
    day: dayLabels[key] ?? key,
    activities: activities.map((a) => ({
      time: a.time,
      title: a.title,
      location: a.location,
    })),
  })),
  donations: {
    spiritualIntro: 'Votre générosité participe à la mission de l\'Église',
    spiritualTitle: donationsData.spiritualText.title,
    verses: donationsData.spiritualText.verses,
    spiritualMessage: donationsData.spiritualText.message,
    thankYou: 'Merci pour votre offrande. Que le Seigneur vous bénisse abondamment pour votre générosité au service de sa Paroisse.',
    receiptNote: 'Un reçu vous sera délivré sur demande auprès du secrétariat paroissial après confirmation de votre don.',
  },
  church: churchFr,
  media: {
    albums: [
      {
        id: 'eglise',
        title: 'Notre église',
        description: 'Architecture, clocher et espaces sacrés de la paroisse.',
        imageIds: ['1', '2', '5', '6'],
      },
      {
        id: 'liturgie',
        title: 'Vie liturgique',
        description: 'Chorale, célébrations et moments de louange.',
        imageIds: ['3', '4'],
      },
      {
        id: 'devotion',
        title: 'Dévotion mariale',
        description: 'Grotte, statues et lieux de prière.',
        imageIds: ['7', '8', '9', '10'],
      },
    ],
    galleryCategories: {
      'Église': 'Église',
      Liturgie: 'Liturgie',
      'Vie paroissiale': 'Vie paroissiale',
      Patrimoine: 'Patrimoine',
      Dévotion: 'Dévotion',
      Histoire: 'Histoire',
    },
    imageTitles: {
      '1': 'Notre église',
      '2': 'Vue de la paroisse',
      '3': 'Chorale paroissiale',
      '4': 'Communauté des fidèles',
      '5': 'Cloche paroissiale',
      '6': 'Clocher',
      '7': 'Grotte mariale',
      '8': 'Ancienne grotte',
      '9': 'Nouvelle grotte',
      '10': 'Statue de la Vierge Marie',
    },
  },
  live: {
    title: liveData.title,
    subtitle: liveData.subtitle,
    description: liveData.description,
    scheduleNote: liveData.scheduleNote,
    upcoming: [
      { title: 'Messe dominicale', date: 'Dimanche 9h00', platform: 'YouTube' },
      { title: 'Messe du soir', date: 'Dimanche 18h00', platform: 'Facebook' },
      { title: 'Veillée d\'adoration', date: 'Premier vendredi 18h00', platform: 'YouTube' },
    ],
  },
}
