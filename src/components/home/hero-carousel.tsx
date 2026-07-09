import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { parishImages } from '@/assets/parish-images'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'

export function HeroCarousel() {
  const { t } = useLanguage()
  const { heroSlides, siteInfo } = useSiteData()
  const [current, setCurrent] = useState(0)

  const slides = useMemo(() => {
    if (heroSlides.length > 0) {
      return heroSlides.map((slide) => ({
        image: slide.imageUrl || parishImages.eglise,
        title: slide.title,
        titleLine2: slide.titleLine2,
        subtitle: slide.description,
        ctaLabel: slide.ctaLabel,
        href: slide.ctaHref,
        featured: slide.featured ?? false,
      }))
    }

    return [
      {
        image: siteInfo.logoUrl || parishImages.eglise,
        title: siteInfo.primaryTitle || t('site.name'),
        titleLine2: siteInfo.secondaryTitle || undefined,
        subtitle: t('home.heroFaith'),
        ctaLabel: t('home.discoverParish'),
        href: '#mot-du-cure',
        featured: true,
      },
    ]
  }, [heroSlides, siteInfo, t])

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [slides.length],
  )

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  useEffect(() => {
    if (current >= slides.length) setCurrent(0)
  }, [current, slides.length])

  const slide = slides[current] ?? slides[0]

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            loading={current === 0 ? 'eager' : 'lazy'}
          />
          <div className="hero-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      <div className="container-wide relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-4 py-24 text-center text-white md:px-8">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-4xl"
        >
          <Badge className="mb-6 border-gold/50 bg-gold/20 text-gold">
            {siteInfo.secondaryTitle || t('site.location')}
          </Badge>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            {slide.featured && heroSlides.length === 0 ? (
              <>
                {t('home.heroTitleLine1')}
                <br />
                <span className="gold-gradient">{t('home.heroTitleLine2')}</span>
              </>
            ) : slide.titleLine2 ? (
              <>
                {slide.title}
                <br />
                <span className="gold-gradient">{slide.titleLine2}</span>
              </>
            ) : (
              slide.title
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
            {slide.subtitle}
          </p>
          <div className="mt-10">
            <Button variant="gold" size="lg" asChild>
              {slide.href.startsWith('/') ? (
                <Link to={slide.href}>{slide.ctaLabel}</Link>
              ) : (
                <a href={slide.href}>{slide.ctaLabel}</a>
              )}
            </Button>
          </div>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition-colors hover:bg-black/50"
        aria-label={t('common.prevSlide')}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur transition-colors hover:bg-black/50"
        aria-label={t('common.nextSlide')}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-8 bg-gold' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`${t('common.goToSlide')} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
