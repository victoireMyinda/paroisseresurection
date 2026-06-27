import type { SiteContent } from '@/i18n/content/types'
import { churchEn } from '@/i18n/content/en/church'
import { frContent } from '@/i18n/content/fr'

export const enContent: SiteContent = {
  ...frContent,
  parish: {
    ...frContent.parish,
    presentation:
      'The Catholic Parish of the Resurrection is a living community in the heart of Lemba Salongo, Kinshasa. Faithful to the Church\'s mission, it welcomes, forms and sends each member to witness to the Gospel in joy and charity.',
    historySummary:
      'Born from the pastoral dynamism of Lemba, our parish bears the name of the Resurrection of Christ — a sign of hope for Salongo-Sud and all of the Congolese capital.',
    history: {
      title: 'Parish history',
      sections: frContent.parish.history.sections.map((s, i) => ({
        ...s,
        heading: [
          'Birth within the Lemba parish network',
          'A name full of hope',
          'Serving the Salongo community',
          'A Church on the move',
        ][i],
        paragraphs: [
          'The Catholic Parish of the Resurrection is part of the rich history of the Catholic Church in Kinshasa, spiritual capital of the Democratic Republic of Congo. Located in Salongo-Sud, within the commune of Lemba, it responds to a growing pastoral need in a rapidly urbanising area.',
          'The name "Resurrection" recalls the heart of the Christian faith: Christ victorious over death, promise of eternal life. In a Congolese context where daily challenges can weigh on hope, our parish seeks to be a visible sign of light overcoming darkness.',
          'Lemba, one of Kinshasa\'s most populous communes, is home to a young and active population. Salongo-Sud, a residential and commercial district, welcomes families, traders and students. The parish accompanies the faithful in the sacraments, faith formation and social engagement, in link with the Archdiocese of Kinshasa.',
          'Structured in pastoral commissions, our parish community works in liturgy, catechesis, youth, family, justice and peace, charity, finance, communication and evangelisation. Every member is called to find their place according to their charisms.',
        ].slice(i, i + 1),
      })),
    },
    curates: frContent.parish.curates.map((c, i) => ({
      ...c,
      achievements: [
        ['Foundation of the first chapel in Salongo-Sud', 'Establishment of the first parish commissions', 'Launch of structured catechesis for children and adults'],
        ['Construction of the current church and rectory', 'Creation of the parish choir and movement groups', 'Development of charitable works for vulnerable families'],
        ['Renovation of the Marian grotto and prayer spaces', 'Intensified evangelisation of youth and families', 'Partnerships with Catholic schools in the district'],
        ['Digitalisation of parish communication and live Masses', 'Strengthening synodal pastoral care and commissions', 'Launch of major parish development projects'],
      ][i],
    })),
    groups: [
      { name: 'Legion of Mary', mission: 'Marian devotion, prayer and apostolic service under the protection of the Blessed Virgin.', activities: 'Weekly meetings, visits to the sick, distribution of medals and rosaries.', responsible: 'Coordinator to be confirmed' },
      { name: 'Charismatic Renewal', mission: 'Living the gifts of the Holy Spirit in service of the Church and evangelisation.', activities: 'Praise vigils, sharing the Word, intercession and formation.', responsible: 'Coordinator to be confirmed' },
      { name: 'Catholic Scouts', mission: 'Integral education of young people through scouting according to Christian values.', activities: 'Camps, hikes, community service and spiritual formation.', responsible: 'Group leader to be confirmed' },
      { name: 'Children and Youth Movement (MEJ)', mission: 'Accompanying children and adolescents in discovering their baptismal vocation.', activities: 'Play activities, retreats, celebrations and solidarity engagement.', responsible: 'MEJ coordinator to be confirmed' },
      { name: 'Focolare Movement', mission: 'Living the Gospel in community and witnessing fraternal charity.', activities: 'Retreats, fraternal sharing, service to the poor and sick.', responsible: 'Coordinator to be confirmed' },
      { name: 'Eucharistic Movement of Children', mission: 'Helping children discover and love Jesus present in the Eucharist.', activities: 'Children\'s adoration, Eucharistic catechesis and adapted celebrations.', responsible: 'Coordinator to be confirmed' },
    ],
    parishLife: {
      title: 'Parish life',
      description: 'Our parish is a place of community life where prayer, formation and solidarity intertwine. From prayer groups to sports activities, from spiritual retreats to charitable actions, each week offers new opportunities to grow in faith and serve others.',
      highlights: frContent.parish.parishLife.highlights.map((h, i) => ({
        title: ['Sunday liturgy', 'Catechesis and formation', 'Charity and solidarity', 'Youth and movements'][i],
        description: h.description,
      })),
    },
    curateMessage: {
      ...frContent.parish.curateMessage,
      title: 'Message from the Parish Priest',
      role: 'Parish Priest',
      greeting: 'Dear brothers and sisters in Christ,',
      content: 'It is with deep pastoral joy that I welcome you to the official website of our parish. The Catholic Parish of the Resurrection, located in the heart of Lemba Salongo, is a living community where faith is celebrated, shared and put into practice in service of our brothers and sisters.\n\nIn a dynamic district of Kinshasa, marked by the vitality of its youth and the richness of its traditions, our parish seeks to be a place of encounter with the risen Christ — source of hope for all. Whether you are a long-time member or seeking meaning, you will find here a spiritual family ready to accompany you.\n\nI invite you to participate actively in parish life: Sunday celebrations, catechesis, charitable works, commission activities. Together, let us build a synodal, welcoming and missionary Church.\n\nMay the peace of the risen Christ remain in your hearts.',
    },
    liturgySchedule: frContent.parish.liturgySchedule.map((s, i) => ({
      ...s,
      category: ['Sunday Masses', 'Weekday Masses', 'Confessions', 'Adoration', 'Catechesis'][i],
      items: s.items.map((item) => ({
        ...item,
        day: item.day
          .replace('Dimanche', 'Sunday')
          .replace('Lundi – Samedi', 'Monday – Saturday')
          .replace('Lundi – Vendredi', 'Monday – Friday')
          .replace('Samedi', 'Saturday')
          .replace('Jeudi', 'Thursday')
          .replace('Mercredi', 'Wednesday')
          .replace('Premier vendredi', 'First Friday')
          .replace('Sur rendez-vous', 'By appointment'),
        description: item.description
          .replace('Messe matinale', 'Morning Mass')
          .replace('Messe principale avec chorale', 'Main Mass with choir')
          .replace('Messe familiale', 'Family Mass')
          .replace('Messe du soir', 'Evening Mass')
          .replace('Messe du matin', 'Morning Mass')
          .replace('Confessions avant le dimanche', 'Confessions before Sunday')
          .replace('Contacter le secrétariat paroissial', 'Contact the parish office')
          .replace('Adoration eucharistique', 'Eucharistic adoration')
          .replace('Veillée d\'adoration mensuelle', 'Monthly adoration vigil')
          .replace('Catéchèse des enfants et des jeunes', 'Catechesis for children and youth')
          .replace('Formation biblique des adultes', 'Bible formation for adults'),
      })),
    })),
  },
  events: {
    works: frContent.events.works.map((w, i) => ({
      ...w,
      title: ['Renovation of the Marian grotto', 'Extension of the parish hall', 'Solar system and forecourt lighting', 'Bible formation centre'][i],
      description: [
        'Complete rehabilitation of the Marian devotion space with new lighting, landscaping and restoration of statues.',
        'Expansion of the multipurpose hall to host training, commission meetings and pastoral activities.',
        'Installation of solar panels and forecourt lighting for vigils and night celebrations.',
        'Project to build a centre dedicated to Bible, catechetical formation and spiritual retreats.',
      ][i],
      goal: [
        'Offer a dignified place of recollection for community and individual prayer.',
        'Capacity of 300 people with modern equipment (sound, projection, accessibility).',
        'Partial energy autonomy and safety for the faithful.',
        'Meet the growing need for adult and catechist formation.',
      ][i],
    })),
  },
  liturgy: {
    ...frContent.liturgy,
    season: '4th Sunday of Easter',
    color: 'Green',
    readings: frContent.liturgy.readings.map((r, i) => ({
      ...r,
      type: ['First reading', 'Second reading'][i],
    })),
    gospel: { ...frContent.liturgy.gospel, reference: 'Jn 10, 1-10', text: 'Amen, amen, I say to you, whoever does not enter a sheepfold through the gate but climbs over elsewhere is a thief and a robber.' },
    psalm: { reference: 'Ps 23', text: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.' },
    homily: {
      ...frContent.liturgy.homily,
      title: 'Sunday homily',
      heading: 'The Good Shepherd',
      excerpt: 'Jesus presents himself as the Good Shepherd who knows his sheep and gives his life for them.',
      content: 'In today\'s Gospel, Christ invites us to trust in his guidance. As a parish community, we are called to listen to his voice and follow him on the path of love and service.',
    },
  },
  announcements: frContent.announcements.map((a, i) => ({
    ...a,
    title: [
      'Parish Lenten retreat 2026',
      'Prayer vigil for peace in the DRC',
      'Marriage banns — June 2026',
      'Baptism celebration — July',
      'Parish charity day',
      'Catechist training session',
      'Youth pilgrimage',
      'Parish council meeting',
      'First Communion celebration',
      'Feast of the Resurrection — solemnity',
    ][i] ?? a.title,
    excerpt: a.excerpt,
    content: a.content,
    category: a.category,
  })),
  announcementCategories: {
    retraites: 'Retreats',
    veillees: 'Prayer vigils',
    bans: 'Marriage banns',
    baptemes: 'Baptisms',
    evenements: 'Events',
    formations: 'Training',
    communiques: 'Announcements',
    deces: 'Deaths',
    remerciements: 'Thank you',
  },
  commissions: frContent.commissions.map((c) => ({
    ...c,
    name: c.name.replace('Commission ', '').replace('Liturgique', 'Liturgical Commission').replace('Catéchèse', 'Catechesis Commission').replace('Jeunesse', 'Youth Commission').replace('Famille', 'Family Commission').replace('Justice et Paix', 'Justice and Peace Commission').replace('Caritas', 'Caritas Commission').replace('Finances', 'Finance Commission').replace('Communication', 'Communication Commission').replace('Évangélisation', 'Evangelisation Commission').replace('Mouvements et Associations', 'Movements and Associations Commission'),
  })),
  weeklySchedule: frContent.weeklySchedule.map((d) => ({
    ...d,
    day: d.day.replace('Lundi', 'Monday').replace('Mardi', 'Tuesday').replace('Mercredi', 'Wednesday').replace('Jeudi', 'Thursday').replace('Vendredi', 'Friday').replace('Samedi', 'Saturday').replace('Dimanche', 'Sunday'),
  })),
  donations: {
    spiritualIntro: 'Your generosity participates in the mission of the Church',
    spiritualTitle: 'Giving in the biblical tradition',
    verses: [
      { reference: '2 Corinthians 9:7', text: 'Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.' },
      { reference: 'Luke 6:38', text: 'Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap.' },
    ],
    spiritualMessage: 'Your generosity enables our parish to continue its spiritual and social mission: maintaining the place of worship, training young people, and helping the most vulnerable in Salongo-Sud. Every gift, whatever the amount, is an act of faith and fraternal solidarity. May God bless you for your offering.',
    thankYou: 'Thank you for your offering. May the Lord bless you abundantly for your generosity in service of his Parish.',
    receiptNote: 'A receipt will be issued upon request at the parish office after confirmation of your donation.',
  },
  church: churchEn,
  media: {
    albums: [
      { id: 'eglise', title: 'Our church', description: 'Architecture, bell tower and sacred spaces of the parish.', imageIds: ['1', '2', '5', '6'] },
      { id: 'liturgie', title: 'Liturgical life', description: 'Choir, celebrations and moments of praise.', imageIds: ['3', '4'] },
      { id: 'devotion', title: 'Marian devotion', description: 'Grotto, statues and places of prayer.', imageIds: ['7', '8', '9', '10'] },
    ],
    galleryCategories: { 'Église': 'Church', Liturgie: 'Liturgy', 'Vie paroissiale': 'Parish life', Patrimoine: 'Heritage', Dévotion: 'Devotion', Histoire: 'History' },
    imageTitles: {
      '1': 'Our church', '2': 'Parish view', '3': 'Parish choir', '4': 'Faithful community',
      '5': 'Parish bell', '6': 'Bell tower', '7': 'Marian grotto', '8': 'Old grotto',
      '9': 'New grotto', '10': 'Statue of the Virgin Mary',
    },
  },
  live: {
    title: 'Live Masses',
    subtitle: 'Follow our celebrations live, wherever you are',
    description: frContent.live.description,
    scheduleNote: 'Sunday Masses are broadcast live on our YouTube and Facebook pages.',
    upcoming: [
      { title: 'Sunday Mass', date: 'Sunday 9:00 AM', platform: 'YouTube' },
      { title: 'Evening Mass', date: 'Sunday 6:00 PM', platform: 'Facebook' },
      { title: 'Adoration vigil', date: 'First Friday 6:00 PM', platform: 'YouTube' },
    ],
  },
}
