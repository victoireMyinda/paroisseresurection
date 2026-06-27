import { buildContent } from '@/i18n/content/build'
import { churchFr } from '@/i18n/content/fr/church'
import donationsData from '@/data/donations.json'

export const luaContent = buildContent({
  parish: {
    ...buildContent({}).parish,
    presentation: 'Paroisse Catholique wa Résurrection udi bulongolodi bua bumi mu kati ya Lemba Salongo, Kinshasa. Mu kuyanganisa ne mudimu wa Église, uyaya, ufundisha ne utuma bantu bonso ku lutaninu lua Évangile mu disanka ne bolongo.',
    historySummary: 'Tudi bamona kudi dynamisme pastoral wa Lemba, paroisse wetu udi ne dituku dia Résurrection wa Kristo — tshibelu tshia ditabuja tshia Salongo-Sud.',
    history: { title: 'Mambu a kale a paroisse', sections: buildContent({}).parish.history.sections },
    curateMessage: {
      ...buildContent({}).parish.curateMessage,
      title: 'Malu a Père Curé', role: 'Père Curé wa Paroisse', greeting: 'Benue bena Kristo,',
    },
  },
  announcementCategories: {
    retraites: 'Ba retraites', veillees: 'Bisalu bia kuleja', bans: 'Bans bia libala',
    baptemes: 'Baptêmes', evenements: 'Bintangila', formations: 'Ba formations',
    communiques: 'Ba communiqués', deces: 'Kufwa', remerciements: 'Matondo',
  },
  donations: {
    spiritualIntro: 'Bupole bwenu bua kuunguka ne mudimu wa Église',
    spiritualTitle: 'Kupa mu tradition biblique',
    verses: donationsData.spiritualText.verses,
    spiritualMessage: 'Bupole bwenu busalisaka mission ya paroisse.',
    thankYou: 'Matondo mwa offrande wenu.',
    receiptNote: 'Receipt udi ne kupeelelwa mu demande.',
  },
  live: {
    title: 'Misa ya live', subtitle: 'Landila misa yetu ya live', description: buildContent({}).live.description,
    scheduleNote: 'Misa ya dimanche idi etindami na live.',
    upcoming: buildContent({}).live.upcoming,
  },
  media: {
    albums: [
      { id: 'eglise', title: 'Eglise yetu', description: 'Architecture ne bisika bia kuleja.', imageIds: ['1', '2', '5', '6'] },
      { id: 'liturgie', title: 'Bumi bwa liturgie', description: 'Chorale ne ba célébrations.', imageIds: ['3', '4'] },
      { id: 'devotion', title: 'Dévotion ya Marie', description: 'Grotte ne bisika bia kuleja.', imageIds: ['7', '8', '9', '10'] },
    ],
    galleryCategories: { 'Église': 'Eglise', Liturgie: 'Liturgie', 'Vie paroissiale': 'Bumi bwa paroisse', Patrimoine: 'Patrimoine', Dévotion: 'Dévotion', Histoire: 'Mambu a kale' },
    imageTitles: buildContent({}).media.imageTitles,
  },
  church: churchFr,
})
