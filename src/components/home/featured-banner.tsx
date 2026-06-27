import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/section-heading'
import liturgyData from '@/data/liturgy.json'
import { useLanguage } from '@/i18n/language-provider'

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const diff = Math.max(0, target - Date.now())
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

export function FeaturedBanner() {
  const { t } = useLanguage()
  const theme = liturgyData.featuredTheme
  const event = liturgyData.nextEvent
  const countdown = useCountdown(event.date)

  return (
    <section className="section-padding pt-20">
      <div className="container-wide">
        <div className="grid gap-6 lg:grid-cols-3">
          <FadeIn className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground md:p-12">
              <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gold/10" />
              <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-gold/5" />
              <div className="relative">
                <p className="text-sm font-medium uppercase tracking-wider text-gold">
                  {theme.subtitle}
                </p>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">{theme.title}</h2>
                <p className="mt-4 max-w-xl text-primary-foreground/85 leading-relaxed">
                  {theme.description}
                </p>
                <Button variant="gold" className="mt-8" asChild>
                  <a href={theme.ctaHref}>
                    {theme.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-primary dark:text-gold">
                <CalendarDays className="h-5 w-5" />
                <h3 className="font-semibold">{t('liturgy.nextEvent')}</h3>
              </div>
              <p className="font-display text-lg font-bold">{event.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{event.location}</p>
              <div className="mt-6 grid grid-cols-4 gap-2 text-center">
                {[
                  { label: t('liturgy.days'), value: countdown.days },
                  { label: t('liturgy.hours'), value: countdown.hours },
                  { label: t('liturgy.minutes'), value: countdown.minutes },
                  { label: t('liturgy.seconds'), value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="rounded-lg bg-muted p-3">
                    <motion.p
                      key={unit.value}
                      initial={{ scale: 0.9, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-primary dark:text-gold"
                    >
                      {String(unit.value).padStart(2, '0')}
                    </motion.p>
                    <p className="text-xs text-muted-foreground">{unit.label}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-auto pt-6" asChild>
                <Link to="/annonces">{t('liturgy.allEvents')}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
