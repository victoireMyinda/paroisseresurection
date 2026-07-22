import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { parishImages } from '@/assets/parish-images'
import { BannerArchdioceseTitle } from '@/components/banner-archdiocese-title'
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
        href: '#annonces',
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
    <section className="relative min-h-[40vh] max-h-[40vh] overflow-hidden md:min-h-[70vh] md:max-h-none lg:min-h-[88vh]">
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

      <div className="container-wide relative z-10 flex min-h-[40vh] flex-col items-center justify-center px-4 py-10 text-center text-white md:min-h-[70vh] md:px-8 md:py-20 lg:min-h-[88vh] lg:py-24">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-4xl"
        >
          <BannerArchdioceseTitle className="mb-3 md:mb-5" />
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-5xl lg:text-7xl">
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
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/90 md:mt-6 md:text-xl">
            {slide.subtitle}
          </p>
          <div className="mt-5 md:mt-10">
            <Button variant="gold" size="lg" className="min-h-11" asChild>
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
