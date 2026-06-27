import { buildContent } from '@/i18n/content/build'
import { churchFr } from '@/i18n/content/fr/church'
import donationsData from '@/data/donations.json'

export const kgContent = buildContent({
  parish: {
    ...buildContent({}).parish,
    presentation: 'Paroisse Catholique ya Résurrection kele lusangani ya bumi na kati ya Lemba Salongo, Kinshasa. Na kuyidika na mission ya Église, ke yambula, ke fundisa mpe ke tinda bantu yonso mpo na kuyebisa Évangile na disanka ne bolingo.',
    historySummary: 'Bavumbukwa na dynamisme pastoral ya Lemba, paroisse na beto kele na nkumbu ya Résurrection ya Kristo — elembo ya diwula mpo na Salongo-Sud.',
    history: { title: 'Lisolo ya paroisse', sections: buildContent({}).parish.history.sections },
    curateMessage: {
      ...buildContent({}).parish.curateMessage,
      title: 'Bansangu ya Père Curé', role: 'Père Curé ya Paroisse', greeting: 'Beno me bena Kristo,',
    },
  },
  announcementCategories: {
    retraites: 'Ba retraites', veillees: 'Bisalu ya kuyidika', bans: 'Bans ya libala',
    baptemes: 'Baptêmes', evenements: 'Bansangu', formations: 'Ba formations',
    communiques: 'Ba communiqués', deces: 'Lufwa', remerciements: 'Matondo',
  },
  donations: {
    spiritualIntro: 'Bokabi na beno ke salisa mission ya Église',
    spiritualTitle: 'Kupesa na tradition biblique',
    verses: donationsData.spiritualText.verses,
    spiritualMessage: 'Bokabi na beno ke salisa mission ya paroisse.',
    thankYou: 'Matondo mpo na offrande na beno.',
    receiptNote: 'Receipt ta pesa na demande.',
  },
  live: {
    title: 'Misa na live', subtitle: 'Landila misa na beto na live', description: buildContent({}).live.description,
    scheduleNote: 'Misa ya dimanche ke tindama na live.',
    upcoming: buildContent({}).live.upcoming,
  },
  media: {
    albums: [
      { id: 'eglise', title: 'Eglise na beto', description: 'Architecture ne bisika ya kuyidika.', imageIds: ['1', '2', '5', '6'] },
      { id: 'liturgie', title: 'Bomoi ya liturgie', description: 'Chorale ne ba célébrations.', imageIds: ['3', '4'] },
      { id: 'devotion', title: 'Dévotion ya Marie', description: 'Grotte ne bisika ya kuyidika.', imageIds: ['7', '8', '9', '10'] },
    ],
    galleryCategories: { 'Église': 'Eglise', Liturgie: 'Liturgie', 'Vie paroissiale': 'Bomoi ya paroisse', Patrimoine: 'Patrimoine', Dévotion: 'Dévotion', Histoire: 'Lisolo' },
    imageTitles: buildContent({}).media.imageTitles,
  },
  church: churchFr,
})
