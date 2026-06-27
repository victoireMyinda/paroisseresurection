import { buildContent } from '@/i18n/content/build'
import { churchFr } from '@/i18n/content/fr/church'
import donationsData from '@/data/donations.json'

export const lnContent = buildContent({
  parish: {
    ...buildContent({}).parish,
    presentation: 'Paroisse Catholique ya Résurrection ezali lisangá ya bomoi na kati ya Lemba Salongo, Kinshasa. Na boyokani na mission ya Église, eyambaka, eformaka mpe etindaka moto nyonso mpo na koyebisa Évangile na esengo mpe bolingo.',
    historySummary: 'Ebotami na dynamisme pastoral ya Lemba, paroisse na biso ezali na kombo ya Résurrection ya Kristo — elembo ya elikya mpo na Salongo-Sud.',
    history: { title: 'Lisolo ya paroisse', sections: buildContent({}).parish.history.sections },
    curateMessage: {
      ...buildContent({}).parish.curateMessage,
      title: 'Maloba ya Père Curé',
      role: 'Père Curé ya Paroisse',
      greeting: 'Bandeko na ngai na Kristo,',
    },
  },
  announcementCategories: {
    retraites: 'Ba retraites', veillees: 'Bisengo ya losambo', bans: 'Bans ya libala',
    baptemes: 'Baptêmes', evenements: 'Ba événements', formations: 'Ba formations',
    communiques: 'Ba communiqués', deces: 'Liwa', remerciements: 'Matondo',
  },
  donations: {
    spiritualIntro: 'Bomoi na bino esalisaka mission ya Église',
    spiritualTitle: 'Kopesa na tradition biblique',
    verses: donationsData.spiritualText.verses,
    spiritualMessage: 'Bomoi na bino esalisaka mission ya paroisse. Nkolo apambola bino.',
    thankYou: 'Matondo mpo na offrande na bino.',
    receiptNote: 'Receipt ekopesama na demande na secrétariat ya paroisse.',
  },
  live: {
    title: 'Misa na live', subtitle: 'Landela misa na biso na live', description: buildContent({}).live.description,
    scheduleNote: 'Misa ya dimanche etindami na live na YouTube mpe Facebook.',
    upcoming: buildContent({}).live.upcoming,
  },
  media: {
    albums: [
      { id: 'eglise', title: 'Eglise na biso', description: 'Architecture mpe esika ya losambo.', imageIds: ['1', '2', '5', '6'] },
      { id: 'liturgie', title: 'Bomoi ya liturgie', description: 'Chorale mpe ba célébrations.', imageIds: ['3', '4'] },
      { id: 'devotion', title: 'Dévotion ya Marie', description: 'Grotte mpe ba esika ya losambo.', imageIds: ['7', '8', '9', '10'] },
    ],
    galleryCategories: { 'Église': 'Eglise', Liturgie: 'Liturgie', 'Vie paroissiale': 'Bomoi ya paroisse', Patrimoine: 'Patrimoine', Dévotion: 'Dévotion', Histoire: 'Lisolo' },
    imageTitles: buildContent({}).media.imageTitles,
  },
  church: churchFr,
})
