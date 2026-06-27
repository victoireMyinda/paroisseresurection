import { BookOpen, Cross, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FadeIn } from '@/components/section-heading'
import liturgyData from '@/data/liturgy.json'
import { formatDate } from '@/lib/utils'
import { useLanguage } from '@/i18n/language-provider'

export function LiturgyWidgets() {
  const { t } = useLanguage()
  const { homily, wordOfDay, saintOfDay } = liturgyData

  return (
    <section id="homelie" className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <Card className="h-full border-gold/20">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <BookOpen className="h-5 w-5 text-gold" />
                  <CardTitle>{t('liturgy.homily')}</CardTitle>
                  <Badge variant="gold">{homily.liturgicalDay}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(homily.date)}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-xl font-bold text-primary dark:text-gold">
                  {homily.heading}
                </h3>
                <p className="leading-relaxed text-muted-foreground">{homily.excerpt}</p>
                <p className="leading-relaxed text-muted-foreground">{homily.content}</p>
              </CardContent>
            </Card>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gold" />
                    <CardTitle className="text-base">{t('liturgy.wordOfDay')}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-gold pl-4 italic text-muted-foreground">
                    &laquo; {wordOfDay.text} &raquo;
                  </blockquote>
                  <cite className="mt-3 block text-sm font-semibold not-italic text-primary dark:text-gold">
                    — {wordOfDay.reference}
                  </cite>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Cross className="h-5 w-5 text-gold" />
                    <CardTitle className="text-base">{t('liturgy.saintOfDay')}</CardTitle>
                  </div>
                  <Badge variant="outline">{saintOfDay.feast}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">{saintOfDay.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {saintOfDay.excerpt}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
