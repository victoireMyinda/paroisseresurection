import { doc, runTransaction } from 'firebase/firestore'
import { firestore } from './app'

const SESSION_KEY = 'parish-visit-tracked'

export async function trackPageVisit(path: string): Promise<void> {
  if (typeof window === 'undefined') return
  if (sessionStorage.getItem(SESSION_KEY)) return

  const today = new Date().toISOString().slice(0, 10)
  const month = today.slice(0, 7)
  const now = new Date().toISOString()
  const ref = doc(firestore, 'siteAnalytics', 'summary')

  try {
    await runTransaction(firestore, async (tx) => {
      const snap = await tx.get(ref)
      if (!snap.exists()) {
        tx.set(ref, {
          totalVisits: 1,
          visitsToday: 1,
          visitsThisMonth: 1,
          dayKey: today,
          monthKey: month,
          lastVisitAt: now,
          lastPath: path,
        })
        return
      }

      const data = snap.data()
      const sameDay = data.dayKey === today
      const sameMonth = data.monthKey === month

      tx.update(ref, {
        totalVisits: Number(data.totalVisits ?? 0) + 1,
        visitsToday: sameDay ? Number(data.visitsToday ?? 0) + 1 : 1,
        visitsThisMonth: sameMonth ? Number(data.visitsThisMonth ?? 0) + 1 : 1,
        dayKey: today,
        monthKey: month,
        lastVisitAt: now,
        lastPath: path,
      })
    })
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch (error) {
    console.warn('[Analytics] Suivi de visite indisponible', error)
  }
}
