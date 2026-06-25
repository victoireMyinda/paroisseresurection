import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { weeklySchedule } from '@/data'
import { pageBanners } from '@/assets/parish-images'
import { dayLabels } from '@/types'

const typeColors: Record<string, string> = {
  Messe: 'bg-primary text-primary-foreground',
  Réunion: 'bg-gold/20 text-gold',
  Activité: 'bg-secondary text-secondary-foreground',
}

export function WeeklyAnnouncementsPage() {
  const days = Object.keys(dayLabels) as Array<keyof typeof dayLabels>

  return (
    <>
      <SEO
        title="Annonces hebdomadaires"
        description="Calendrier hebdomadaire des messes, réunions et activités de la Paroisse de la Résurrection."
        path="/annonces-hebdomadaires"
      />
      <PageHeader
        title="Annonces hebdomadaires"
        subtitle="Programme de la semaine paroissiale"
        image={pageBanners['annonces-hebdomadaires']}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {days.map((day, i) => {
              const activities = weeklySchedule[day] ?? []
              return (
                <FadeIn key={day} delay={i * 0.05}>
                  <Card className={`h-full ${day === 'dimanche' ? 'border-gold/50 ring-1 ring-gold/20' : ''}`}>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        {dayLabels[day]}
                        {day === 'dimanche' && (
                          <Badge variant="gold">Dimanche</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {activities.map((activity, j) => (
                        <div
                          key={j}
                          className="rounded-lg border p-3"
                        >
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <Badge
                              className={typeColors[activity.type] ?? 'bg-muted'}
                            >
                              {activity.type}
                            </Badge>
                            <span className="text-sm font-semibold">{activity.time}</span>
                          </div>
                          <p className="text-sm font-medium">{activity.title}</p>
                          {activity.responsible !== '—' && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Responsable : {activity.responsible}
                            </p>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
