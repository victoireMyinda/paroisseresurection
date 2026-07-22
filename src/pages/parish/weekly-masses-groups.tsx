import { parishSubNav } from '@/config/navigation'
import { PageShell } from '@/components/content/page-shell'
import { FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { parishImages } from '@/assets/parish-images'

export function ParishWeeklyPage() {
  const { t, content } = useLanguage()
  const { getBanner } = useSiteData()

  return (
    <PageShell
      title={t('nav.parish.weekly')}
      subtitle={t('bulletin.subtitle')}
      image={getBanner('/notre-paroisse/annonces-semaine', parishImages.fidele)}
      path="/notre-paroisse/annonces-semaine"
      subNav={parishSubNav}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {content.weeklySchedule.map((day, i) => (
          <FadeIn key={day.day} delay={i * 0.05}>
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                  {day.day}
                  <Badge variant="outline">{day.activities.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.activities.length === 0 ? (
                  <p className="text-sm text-muted-foreground">—</p>
                ) : (
                  day.activities.map((act) => (
                    <div key={act.title + act.time} className="border-l-2 border-gold/40 pl-3">
                      <p className="text-sm font-semibold text-primary">{act.time}</p>
                      <p className="font-medium">{act.title}</p>
                      <p className="text-xs text-muted-foreground">{act.location}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </PageShell>
  )
}

export function ParishMassesPage() {
  const { t, content } = useLanguage()
  const { getBanner } = useSiteData()

  return (
    <PageShell
      title={t('nav.parish.masses')}
      subtitle={t('home.schedulesSub')}
      image={getBanner('/notre-paroisse/messes', parishImages.chorale)}
      path="/notre-paroisse/messes"
      subNav={parishSubNav}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {content.parish.liturgySchedule.map((schedule, i) => (
          <FadeIn key={schedule.category} delay={i * 0.06}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{schedule.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {schedule.items.map((item) => (
                  <div key={item.time + item.day} className="rounded-lg bg-muted/50 p-3 text-sm">
                    <p className="font-bold">{item.time}</p>
                    <p className="font-medium">{item.day}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </PageShell>
  )
}

export function ParishGroupsPage() {
  const { t, content } = useLanguage()
  const { getBanner } = useSiteData()

  return (
    <PageShell
      title={t('nav.parish.groups')}
      subtitle={content.parish.parishLife.description}
      image={getBanner('/notre-paroisse/groupes', parishImages.grotte)}
      path="/notre-paroisse/groupes"
      subNav={parishSubNav}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {content.parish.groups.map((group, i) => (
          <FadeIn key={group.name} delay={i * 0.06}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
                <p className="text-sm font-medium text-gold">{group.mission}</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{group.activities}</p>
                <p className="font-medium text-foreground">{group.responsible}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </PageShell>
  )
}
