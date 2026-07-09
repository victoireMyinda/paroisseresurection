import { liturgySubNav } from '@/config/navigation'
import { PageShell, ContentBlocks } from '@/components/content/page-shell'
import { FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { parishImages } from '@/assets/parish-images'

export function LiturgyCalendarPage() {
  const { t, content } = useLanguage()
  const { liturgy } = content
  const { getBanner } = useSiteData()
  const seasons = liturgy.calendar?.seasons ?? []

  return (
    <PageShell
      title={t('nav.liturgy.calendar')}
      subtitle={liturgy.season}
      image={getBanner('/liturgie/calendrier', parishImages.chorale)}
      path="/liturgie/calendrier"
      subNav={liturgySubNav}
    >
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="gold" className="mb-4">{liturgy.color}</Badge>
        <h2 className="text-2xl font-bold">{liturgy.season}</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {liturgy.calendar?.nextEventTitle ?? t('liturgy.nextEvent')}: {liturgy.calendar?.nextEventDate ?? liturgy.homily.liturgicalDay}
        </p>
        <div className="mt-10 grid gap-4 text-left sm:grid-cols-2">
          {(seasons.length ? seasons : [{ name: liturgy.season }]).map((season) => (
            <FadeIn key={season.name}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{season.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {season.note ?? (season.name === liturgy.season ? t('nav.liturgy.calendar') : '—')}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageShell>
  )
}

export function LiturgyHomilyPage() {
  const { t, content } = useLanguage()
  const { homily } = content.liturgy
  const { getBanner } = useSiteData()

  return (
    <PageShell
      title={t('nav.liturgy.homily')}
      subtitle={homily.liturgicalDay}
      image={getBanner('/liturgie/homelie', parishImages.eglise)}
      path="/liturgie/homelie"
      subNav={liturgySubNav}
    >
      <article className="mx-auto max-w-3xl">
        <Badge variant="gold" className="mb-4">{homily.liturgicalDay}</Badge>
        <h2 className="text-3xl font-bold text-primary dark:text-gold">{homily.heading}</h2>
        <p className="mt-6 text-lg italic text-muted-foreground">{homily.excerpt}</p>
        <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
          <p>{homily.content}</p>
        </div>
      </article>
    </PageShell>
  )
}

export function LiturgyDailyPage() {
  const { t, content } = useLanguage()
  const { liturgy } = content
  const { getBanner } = useSiteData()

  return (
    <PageShell
      title={t('nav.liturgy.daily')}
      subtitle={liturgy.saint.feast}
      image={getBanner('/liturgie/parole-saint', parishImages.statutmarie)}
      path="/liturgie/parole-saint"
      subNav={liturgySubNav}
    >
      <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
        <FadeIn>
          <Card className="h-full border-gold/20">
            <CardHeader>
              <CardTitle>{t('liturgy.wordOfDay')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {liturgy.readings.map((r) => (
                <div key={r.reference}>
                  <p className="text-sm font-semibold text-gold">{r.type}</p>
                  <p className="text-xs text-muted-foreground">{r.reference}</p>
                  <p className="mt-2 text-sm leading-relaxed italic">&laquo; {r.text} &raquo;</p>
                </div>
              ))}
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gold">{t('liturgy.homily')} — {liturgy.gospel.reference}</p>
                <p className="mt-2 text-sm leading-relaxed italic">&laquo; {liturgy.gospel.text} &raquo;</p>
              </div>
              <div>
                <p className="text-sm font-semibold">{liturgy.psalm.reference}</p>
                <p className="mt-2 text-sm italic text-muted-foreground">{liturgy.psalm.text}</p>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>{t('liturgy.saintOfDay')}</CardTitle>
              <Badge variant="outline">{liturgy.saint.feast}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{liturgy.saint.name}</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">{liturgy.saint.meditation}</p>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </PageShell>
  )
}
