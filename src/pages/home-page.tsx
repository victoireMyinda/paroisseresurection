import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  Users,
  Calendar,
  Church,
  ArrowRight,
  Clock,
  Radio,
} from 'lucide-react'
import { SEO } from '@/components/seo'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { parish, announcements, galleryImages } from '@/data'
import { parishImages, parishLifeImages } from '@/assets/parish-images'
import { LiveMassesSection } from '@/components/live-masses-section'
import { formatDate } from '@/lib/utils'
import { siteConfig } from '@/config/site'

const statIcons = [Users, Users, Calendar, Heart]

export function HomePage() {
  const stats = [
    { label: 'Commissions', value: parish.statistics.commissions },
    { label: 'Sous-commissions', value: parish.statistics.subCommissions },
    { label: 'Événements', value: parish.statistics.events },
    { label: 'Fidèles', value: parish.statistics.faithful },
  ]

  const recentAnnouncements = announcements.slice(0, 6)

  return (
    <>
      <SEO />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <img
          src={parishImages.hero}
          alt="Église de la Paroisse de la Résurrection"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-wide relative z-10 px-4 py-20 text-center text-white md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="mb-6 border-gold/50 bg-gold/20 text-gold">
              Lemba Salongo — Kinshasa, RDC
            </Badge>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Paroisse Catholique
              <br />
              <span className="gold-gradient">de la Résurrection</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
              Une communauté de foi, d&apos;espérance et de charité au cœur de Lemba Salongo.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button variant="gold" size="lg" asChild>
                <Link to="/dons">Faire un don</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <a href="#direct">
                  <Radio className="h-4 w-4" />
                  Messe en direct
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mot du Curé */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title={parish.curateMessage.title} />
          <FadeIn>
            <Card className="mx-auto max-w-4xl border-gold/20">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-2 ring-gold/30">
                    <Church className="h-8 w-8 text-primary dark:text-gold" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary dark:text-gold">
                      {parish.curateMessage.name}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      {parish.curateMessage.role}
                    </p>
                    <p className="mt-1 font-semibold">{parish.curateMessage.greeting}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(parish.curateMessage.date)}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {parish.curateMessage.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <p className="mt-6 font-display text-lg italic text-primary dark:text-gold">
                  {parish.curateMessage.signature}
                  <span className="mt-1 block text-sm font-sans not-italic text-muted-foreground">
                    {parish.curateMessage.role}
                  </span>
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Historique */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading title={parish.history.title} subtitle="Notre paroisse dans le tissu spirituel de Kinshasa" />
          <FadeIn>
            <div className="mb-10 overflow-hidden rounded-2xl">
              <img
                src={parishImages.paroisse}
                alt="Vue de la Paroisse de la Résurrection à Lemba Salongo"
                className="h-64 w-full object-cover md:h-80"
                loading="lazy"
              />
            </div>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            {parish.history.sections.map((section, i) => (
              <FadeIn key={section.title} delay={i * 0.1}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Horaires */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            title="Horaires des célébrations"
            subtitle="Rejoignez-nous pour la prière et la célébration eucharistique"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {parish.liturgySchedule.map((schedule, i) => (
              <FadeIn key={schedule.category} delay={i * 0.08}>
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gold" />
                      <CardTitle className="text-base">{schedule.category}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {schedule.items.map((item, j) => (
                      <div key={j} className="flex justify-between gap-2 text-sm">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="font-medium">{item.time}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <LiveMassesSection />

      {/* Vie paroissiale */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide">
          <SectionHeading
            title={parish.parishLife.title}
            subtitle={parish.parishLife.description}
            className="[&_h2]:text-primary-foreground [&_p]:text-primary-foreground/80"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {parish.parishLife.highlights.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
                  <img
                    src={parishLifeImages[i]}
                    alt={item.title}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 font-semibold">{item.title}</h3>
                    <p className="text-sm opacity-80">{item.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = statIcons[i] ?? Users
              return (
                <FadeIn key={stat.label} delay={i * 0.1}>
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <Icon className="mx-auto mb-3 h-8 w-8 text-gold" />
                      <p className="text-4xl font-bold text-primary dark:text-gold">
                        {stat.value.toLocaleString('fr-FR')}
                        {stat.label === 'Fidèles' && '+'}
                      </p>
                      <p className="mt-1 text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Annonces récentes */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading title="Dernières annonces" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentAnnouncements.map((ann, i) => (
              <FadeIn key={ann.id} delay={i * 0.08}>
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <Badge variant="gold" className="w-fit">
                      {ann.category}
                    </Badge>
                    <CardTitle className="text-lg leading-snug">{ann.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{formatDate(ann.date)}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">{ann.excerpt}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild>
              <Link to="/annonces">
                Voir toutes les annonces
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Galerie rapide */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title="Galerie" subtitle="Moments de vie paroissiale" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryImages.map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.05}>
                <Link to="/medias" className="group relative block overflow-hidden rounded-xl">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">{img.title}</span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link to="/medias">
                Voir la galerie complète
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold md:text-3xl">
              Rejoignez notre communauté de foi
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {siteConfig.address.full} — Nous vous accueillons avec joie.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/commissions">Découvrir nos commissions</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
