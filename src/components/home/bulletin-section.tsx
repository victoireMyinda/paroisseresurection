import { Link } from 'react-router-dom'
import { ArrowRight, FileText } from 'lucide-react'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import bulletinData from '@/data/bulletin.json'
import { formatDate } from '@/lib/utils'
import { useLanguage } from '@/i18n/language-provider'

export function BulletinSection() {
  const { t } = useLanguage()

  return (
    <section className="section-padding">
      <div className="container-wide">
        <SectionHeading title={t('bulletin.title')} subtitle={t('bulletin.subtitle')} />
        <div className="grid gap-6 md:grid-cols-3">
          {bulletinData.items.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.08}>
              <Card className="group flex h-full flex-col transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary dark:text-gold" />
                  </div>
                  <CardTitle className="text-base leading-snug group-hover:text-primary dark:group-hover:text-gold">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm text-muted-foreground">{item.excerpt}</p>
                  <Button variant="link" className="mt-4 h-auto justify-start p-0" asChild>
                    <Link to="/annonces-hebdomadaires">
                      {t('bulletin.read')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
