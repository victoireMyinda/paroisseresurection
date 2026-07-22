import { Link } from 'react-router-dom'
import { BookOpen, Cross, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { useLanguage } from '@/i18n/language-provider'

export function LiturgyWidgets() {
  const { t, content } = useLanguage()
  const { homily, gospel, saint } = content.liturgy

  return (
    <section id="homelie" className="section-padding bg-muted/30">
      <div className="container-wide">
        <SectionHeading title={t('home.liturgyToday')} subtitle={t('home.liturgyTodaySub')} />

        <div className="lg:hidden">
          <Tabs defaultValue="homily" className="w-full">
            <TabsList className="mb-4 grid h-auto w-full grid-cols-3 p-1">
              <TabsTrigger value="homily" className="min-h-11 py-2 text-xs sm:text-sm">
                {t('liturgy.homily')}
              </TabsTrigger>
              <TabsTrigger value="word" className="min-h-11 py-2 text-xs sm:text-sm">
                {t('liturgy.wordOfDay')}
              </TabsTrigger>
              <TabsTrigger value="saint" className="min-h-11 py-2 text-xs sm:text-sm">
                {t('liturgy.saintOfDay')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="homily">
              <HomilyCard homily={homily} t={t} />
            </TabsContent>
            <TabsContent value="word">
              <WordCard gospel={gospel} t={t} />
            </TabsContent>
            <TabsContent value="saint">
              <SaintCard saint={saint} t={t} />
            </TabsContent>
          </Tabs>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="min-h-11 flex-1" asChild>
              <Link to="/liturgie/homelie">
                {t('home.readFullHomily')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="min-h-11 flex-1" asChild>
              <Link to="/liturgie/parole-saint">
                {t('nav.liturgy.daily')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          <FadeIn className="lg:col-span-2">
            <HomilyCard homily={homily} t={t} />
          </FadeIn>
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <WordCard gospel={gospel} t={t} />
            </FadeIn>
            <FadeIn delay={0.15}>
              <SaintCard saint={saint} t={t} />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomilyCard({
  homily,
  t,
}: {
  homily: { liturgicalDay: string; heading: string; excerpt: string; content: string }
  t: (key: string) => string
}) {
  return (
    <Card className="h-full border-gold/20">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <BookOpen className="h-5 w-5 text-gold" aria-hidden />
          <CardTitle className="text-xl">{t('liturgy.homily')}</CardTitle>
          {homily.liturgicalDay ? <Badge variant="gold">{homily.liturgicalDay}</Badge> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-bold text-primary dark:text-gold">{homily.heading}</h3>
        {homily.excerpt ? (
          <p className="text-base leading-relaxed text-muted-foreground">{homily.excerpt}</p>
        ) : null}
        {homily.content ? (
          <p className="line-clamp-4 text-base leading-relaxed text-muted-foreground lg:line-clamp-none">
            {homily.content}
          </p>
        ) : null}
        <Button variant="link" className="h-auto min-h-11 p-0" asChild>
          <Link to="/liturgie/homelie">
            {t('home.readFullHomily')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function WordCard({
  gospel,
  t,
}: {
  gospel: { reference: string; text: string }
  t: (key: string) => string
}) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-gold" aria-hidden />
          <CardTitle className="text-base">{t('liturgy.wordOfDay')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="border-l-4 border-gold pl-4 text-base italic leading-relaxed text-muted-foreground">
          &laquo; {gospel.text} &raquo;
        </blockquote>
        <cite className="mt-3 block text-sm font-semibold not-italic text-primary dark:text-gold">
          — {gospel.reference}
        </cite>
      </CardContent>
    </Card>
  )
}

function SaintCard({
  saint,
  t,
}: {
  saint: { name: string; feast: string; meditation: string }
  t: (key: string) => string
}) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Cross className="h-5 w-5 text-gold" aria-hidden />
          <CardTitle className="text-base">{t('liturgy.saintOfDay')}</CardTitle>
        </div>
        {saint.feast ? <Badge variant="outline">{saint.feast}</Badge> : null}
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold">{saint.name}</p>
        {saint.meditation ? (
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{saint.meditation}</p>
        ) : null}
      </CardContent>
    </Card>
  )
}
