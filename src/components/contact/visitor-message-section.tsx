import { MessageSquare } from 'lucide-react'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/i18n/language-provider'
import { VisitorMessageForm } from '@/components/contact/visitor-message-form'

export function VisitorMessageSection() {
  const { t } = useLanguage()

  return (
    <section id="laisser-un-message" className="section-padding bg-muted/50">
      <div className="container-wide">
        <SectionHeading
          title={t('visitorMessage.title')}
          subtitle={t('visitorMessage.subtitle')}
        />
        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <div className="flex h-full flex-col justify-center rounded-2xl border bg-card p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary dark:text-gold" />
              </div>
              <h3 className="text-xl font-bold">{t('visitorMessage.cardTitle')}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t('visitorMessage.cardText')}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">{t('visitorMessage.privacy')}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>{t('visitorMessage.formTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <VisitorMessageForm />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
