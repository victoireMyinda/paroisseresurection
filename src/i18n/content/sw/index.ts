import { buildContent } from '@/i18n/content/build'
import { churchEn } from '@/i18n/content/en/church'

export const swContent = buildContent({
  parish: {
    ...buildContent({}).parish,
    presentation: 'Parokia ya Katoliki ya Ufufuo ni jumuiya hai katika Lemba Salongo, Kinshasa. Kwa uaminifu kwa dhamira ya Kanisa, inakaribisha, inafundisha na kutuma kila muumini kushuhudia Injili kwa furaha na upendo.',
    historySummary: 'Ilizaliwa kutokana na nguvu za kichungaji za Lemba, parokia yetu inabeba jina la Ufufuo wa Kristo — ishara ya tumaini kwa Salongo-Sud.',
    history: { title: 'Historia ya parokia', sections: buildContent({}).parish.history.sections },
    curateMessage: {
      ...buildContent({}).parish.curateMessage,
      title: 'Ujumbe wa Padre Mkuu', role: 'Padre Mkuu wa Parokia', greeting: 'Ndugu zangu katika Kristo,',
    },
  },
  announcementCategories: {
    retraites: 'Retreats', veillees: 'Maombi ya usiku', bans: 'Matangazo ya ndoa',
    baptemes: 'Ubatizo', evenements: 'Matukio', formations: 'Mafunzo',
    communiques: 'Matangazo', deces: 'Vifo', remerciements: 'Shukrani',
  },
  donations: {
    spiritualIntro: 'Uk generosity wako unashiriki katika dhamira ya Kanisa',
    spiritualTitle: 'Kutoa katika mila ya kibiblia',
    verses: [
      { reference: '2 Wakorintho 9:7', text: 'Kila mtu na atoe kama alivyokusudia moyoni mwake, si kwa huzuni wala kwa lazima, maana Mungu humpenda yule mwenye kutoa kwa furaha.' },
      { reference: 'Luka 6:38', text: 'Hepeni, nanyi mtapewa; kipimo kizuri, kilichoshindiliwa na kusukwa na kumwagika, watakupeni.' },
    ],
    spiritualMessage: 'Uk generosity wako unawezesha parokia yetu kuendeleza dhamira yake ya kiroho na kijamii.',
    thankYou: 'Asante kwa sadaka yako. Bwana akubariki.',
    receiptNote: 'Risiti itatolewa kwa ombi ofisini.',
  },
  live: {
    title: 'Misa za moja kwa moja', subtitle: 'Fuata ibada zetu popote ulipo',
    description: buildContent({}).live.description,
    scheduleNote: 'Misa za Jumapili zinatangazwa moja kwa moja kwenye YouTube na Facebook.',
    upcoming: [
      { title: 'Misa ya Jumapili', date: 'Jumapili 9:00', platform: 'YouTube' },
      { title: 'Misa ya jioni', date: 'Jumapili 18:00', platform: 'Facebook' },
      { title: 'Maombi ya adoration', date: 'Ijumaa ya kwanza 18:00', platform: 'YouTube' },
    ],
  },
  media: {
    albums: [
      { id: 'eglise', title: 'Kanisa letu', description: 'Usanifu, mnara na maeneo matakatifu.', imageIds: ['1', '2', '5', '6'] },
      { id: 'liturgie', title: 'Maisha ya liturujia', description: 'Kwaya na ibada.', imageIds: ['3', '4'] },
      { id: 'devotion', title: 'Ibada ya Maria', description: 'Pango, sanamu na maeneo ya sala.', imageIds: ['7', '8', '9', '10'] },
    ],
    galleryCategories: { 'Église': 'Kanisa', Liturgie: 'Liturujia', 'Vie paroissiale': 'Maisha ya parokia', Patrimoine: 'Urithi', Dévotion: 'Ibada', Histoire: 'Historia' },
    imageTitles: {
      '1': 'Kanisa letu', '2': 'Muonekano wa parokia', '3': 'Kwaya ya parokia', '4': 'Jumuiya ya waumini',
      '5': 'Kengele ya parokia', '6': 'Mnara', '7': 'Pango la Maria', '8': 'Pango la zamani',
      '9': 'Pango jipya', '10': 'Sanamu ya Bikira Maria',
    },
  },
  church: churchEn,
})
