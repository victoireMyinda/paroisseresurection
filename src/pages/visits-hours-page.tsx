import { Link } from 'react-router-dom'
import { Building2, CalendarDays, Church, Clock, MapPin, Phone } from 'lucide-react'
import { parishSubNav } from '@/config/navigation'
import { PageShell } from '@/components/content/page-shell'
import { FadeIn, SectionHeading } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { parishImages } from '@/assets/parish-images'
import type { VisitSlot } from '@/i18n/content/types'

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('243')) return `+${digits}`
  if (digits.startsWith('0')) return `+243${digits.slice(1)}`
  return `+${digits}`
}

function VisitSlotCard({ slot, accent }: { slot: VisitSlot; accent: 'royal' | 'gold' }) {
  const { t } = useLanguage()
  const tel = normalizePhone(slot.phone)
  const accentBorder = accent === 'royal' ? 'border-l-primary' : 'border-l-gold'
  const accentBadge = accent === 'royal' ? 'default' : 'gold'

  return (
    <Card className={`h-full overflow-hidden border-l-4 ${accentBorder}`}>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <Badge variant={accentBadge}>{slot.name}</Badge>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-gold" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('visitsPage.day')}</p>
              <p className="mt-0.5 font-medium">{slot.day}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-gold" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('visitsPage.hours')}</p>
              <p className="mt-0.5 font-semibold text-primary dark:text-gold">{slot.timeRange}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary dark:text-gold" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('visitsPage.location')}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{slot.location}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary dark:text-gold" aria-hidden />
            <span className="font-medium">{slot.phone}</span>
          </div>
          {tel && (
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${tel}`}>{t('visitsPage.call')}</a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function VisitSection({
  title,
  description,
  icon: Icon,
  slots,
  emptyMessage,
  accent,
}: {
  title: string
  description: string
  icon: typeof Building2
  slots: VisitSlot[]
  emptyMessage: string
  accent: 'royal' | 'gold'
}) {
  const sectionClass =
    accent === 'royal'
      ? 'bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10'
      : 'bg-gradient-to-br from-gold/10 via-background to-background'

  return (
    <div className={`rounded-2xl border border-border/60 p-6 md:p-8 ${sectionClass}`}>
      <div className="mb-6 flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
            accent === 'royal' ? 'bg-primary/10 text-primary' : 'bg-gold/15 text-gold'
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {slots.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      ) : (
        <div className="grid gap-4">
          {slots.map((slot, i) => (
            <FadeIn key={slot.id} delay={i * 0.05}>
              <VisitSlotCard slot={slot} accent={accent} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  )
}

export function VisitsHoursPage() {
  const { t, content } = useLanguage()
  const { getBanner } = useSiteData()
  const { secretary, curate } = content.visitHours

  return (
    <PageShell
      title={t('visitsPage.title')}
      subtitle={t('visitsPage.subtitle')}
      image={getBanner('/visites-horaires', parishImages.eglise)}
      path="/visites-horaires"
      subNav={parishSubNav}
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <SectionHeading
          title={t('visitsPage.title')}
          subtitle={t('visitsPage.subtitle')}
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <VisitSection
            title={t('visitsPage.secretaryTitle')}
            description={t('visitsPage.secretaryDesc')}
            icon={Building2}
            slots={secretary}
            emptyMessage={t('visitsPage.emptySecretary')}
            accent="royal"
          />

          <VisitSection
            title={t('visitsPage.curateTitle')}
            description={t('visitsPage.curateDesc')}
            icon={Church}
            slots={curate}
            emptyMessage={t('visitsPage.emptyCurate')}
            accent="gold"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button variant="outline" asChild>
            <Link to="/contact">{t('common.contact')}</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
