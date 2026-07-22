import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Mail, MapPin, Heart, Clock, Users, Calendar, Church } from 'lucide-react'
import { SEO } from '@/components/seo'
import { SectionHeading, FadeIn } from '@/components/section-heading'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { QuickAccessBar } from '@/components/home/quick-access-bar'
import { LiturgyWidgets } from '@/components/home/liturgy-widgets'
import { HomeLiveBanner } from '@/components/home/home-live-banner'
import { HomeExploreSection } from '@/components/home/home-explore-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { parishImages } from '@/assets/parish-images'
import { formatDate } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { EventMediaThumb } from '@/components/events/event-media'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { VisitorMessageSection } from '@/components/contact/visitor-message-section'

const statIcons = [Users, Calendar, Heart, Church]

const parishQuickLinks = [
  { href: '/notre-paroisse/messes', key: 'nav.parish.masses' },
  { href: '/notre-paroisse/commissions', key: 'nav.parish.commissions' },
  { href: '/notre-paroisse/groupes', key: 'nav.parish.groups' },
] as const

export function HomePage() {
  const { t, content } = useLanguage()
  const { galleryImages: photos, commissionImageMap, curateMessageImage, aboutImage, siteInfo } = useSiteData()
  const [curateExpanded, setCurateExpanded] = useState(false)
  const today = new Date().toISOString().slice(0, 10)

  const stats = [
    { label: t('home.statCommissions'), value: 10 },
    { label: t('home.statSubCommissions'), value: 42 },
    { label: t('home.statEvents'), value: content.announcements.length },
    { label: t('home.statFaithful'), value: 3500 },
  ]

  const latestNews = content.announcements.slice(0, 3)
  const upcomingEvents = content.announcements.filter((a) => a.date >= today).slice(0, 4)
  const featuredCommissions = content.commissions.slice(0, 4)
  const curateParagraphs = content.parish.curateMessage.content.split('\n\n')

  return (
    <>
      <SEO />

      <HeroCarousel />
      <QuickAccessBar />

      {/* 1. Annonces — priorité mobile */}
      <section id="annonces" className="section-padding pt-8 md:pt-12">
        <div className="container-wide">
          <SectionHeading title={t('home.latestNews')} subtitle={t('home.latestNewsSub')} />
          <div className="grid gap-4">
            {latestNews.map((ann, i) => (
              <FadeIn key={ann.id} delay={i * 0.05}>
                <Card className={`overflow-hidden ${ann.media ? 'pt-0' : ''}`}>
                  {ann.media && (
                    <div className="relative h-40 w-full">
                      <EventMediaThumb media={ann.media} title={ann.title} />
                    </div>
                  )}
                  <CardHeader className={ann.media ? 'pt-4' : undefined}>
                    <Badge variant="outline" className="w-fit">
                      {content.announcementCategories[ann.category] ?? ann.category}
                    </Badge>
                    <CardTitle className="text-lg leading-snug">{ann.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{formatDate(ann.date)}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed text-muted-foreground">{ann.excerpt}</p>
                    <Button variant="link" className="mt-3 h-auto min-h-11 p-0" asChild>
                      <Link to={`/annonces/toutes/${ann.id}`}>{t('common.readMore')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button className="min-h-11" asChild>
              <Link to="/annonces/semaine">
                {t('home.weeklyAnnouncements')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="min-h-11" asChild>
              <Link to="/annonces/toutes">
                {t('home.allNews')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Notre paroisse */}
      <section id="notre-paroisse" className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading title={t('home.about')} subtitle={t('home.parishIntroSub')} />
          <div className="grid gap-8 lg:grid-cols-2">
            <FadeIn>
              <p className="text-base leading-relaxed text-muted-foreground">{content.parish.presentation}</p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{content.parish.historySummary}</p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {parishQuickLinks.map((link) => (
                  <Button key={link.href} variant="outline" className="min-h-11" asChild>
                    <Link to={link.href}>{t(link.key)}</Link>
                  </Button>
                ))}
              </div>
              <Button className="mt-4 min-h-11" asChild>
                <Link to="/notre-paroisse/histoire">
                  {t('home.discoverParish')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </FadeIn>
            <FadeIn delay={0.1}>
              <img
                src={aboutImage}
                alt=""
                className="h-48 w-full rounded-2xl object-cover sm:h-64 lg:h-full lg:min-h-[280px]"
              />
            </FadeIn>
          </div>

          <div id="horaires" className="mt-10">
            <h3 className="text-xl font-bold md:text-2xl">{t('home.schedules')}</h3>
            <p className="mt-1 text-base text-muted-foreground">{t('home.schedulesSub')}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {content.parish.liturgySchedule.map((schedule, i) => (
                <FadeIn key={schedule.category} delay={i * 0.04}>
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gold" aria-hidden />
                        <CardTitle className="text-sm">{schedule.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {schedule.items.map((item, j) => (
                        <div key={j} className="text-sm">
                          <p className="font-medium">{item.time}</p>
                          <p className="text-muted-foreground">{item.day}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="min-h-11" asChild>
                <Link to="/notre-paroisse/messes">{t('nav.parish.masses')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mot du Curé */}
      <section id="mot-du-cure" className="section-padding">
        <div className="container-wide">
          <Badge variant="gold" className="mb-4">
            {t('home.curateMessage')}
          </Badge>
          <div className="grid items-start gap-6 lg:grid-cols-5 lg:gap-8">
            <FadeIn className="lg:col-span-2">
              <img
                src={curateMessageImage}
                alt={t('home.churchAlt')}
                className="mx-auto aspect-[4/3] w-full max-w-xs rounded-2xl object-cover sm:max-w-sm lg:aspect-[4/5] lg:max-w-none"
              />
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-3">
              <h2 className="text-2xl font-bold md:text-3xl">{content.parish.curateMessage.title}</h2>
              <p className="mt-3 text-lg font-bold text-primary dark:text-gold">
                {content.parish.curateMessage.name}
              </p>
              <p className="text-sm font-medium text-muted-foreground">{content.parish.curateMessage.role}</p>
              <p className="mt-4 text-base font-semibold">{content.parish.curateMessage.greeting}</p>
              <div
                className={`mt-4 space-y-4 text-base leading-relaxed text-muted-foreground ${
                  !curateExpanded ? 'line-clamp-6 lg:line-clamp-none' : ''
                }`}
              >
                {curateParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-4 lg:hidden">
                <Button
                  variant="outline"
                  className="min-h-11"
                  onClick={() => setCurateExpanded((v) => !v)}
                  aria-expanded={curateExpanded}
                >
                  {curateExpanded ? t('home.showLess') : t('common.readMore')}
                </Button>
              </div>
              <p className="mt-6 font-display text-lg italic text-primary dark:text-gold">
                {content.parish.curateMessage.signature}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. Liturgie du jour */}
      <LiturgyWidgets />

      {/* 5. Messe en direct */}
      <HomeLiveBanner />

      {/* 6. Contenu secondaire */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading title={t('common.upcomingEvents')} subtitle={t('liturgy.nextEvent')} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {upcomingEvents.map((ev, i) => (
              <FadeIn key={ev.id} delay={i * 0.06}>
                <Card className={`h-full overflow-hidden border-gold/20 ${ev.media ? 'pt-0' : ''}`}>
                  {ev.media ? (
                    <div className="relative h-32 w-full">
                      <EventMediaThumb media={ev.media} title={ev.title} />
                    </div>
                  ) : null}
                  <CardContent className={ev.media ? 'pt-4' : 'pt-6'}>
                    <p className="text-2xl font-bold text-primary dark:text-gold">
                      {new Date(ev.date).getDate()}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(ev.date)}</p>
                    <h3 className="mt-3 text-base font-semibold leading-snug">{ev.title}</h3>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="min-h-11" asChild>
              <Link to="/annonces/toutes">{t('common.allEvents')}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-wide">
          <SectionHeading title={t('common.featuredCommissions')} subtitle={t('home.discoverCommissions')} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCommissions.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.06}>
                <Link
                  to="/notre-paroisse/commissions"
                  className="group block overflow-hidden rounded-xl bg-white/10 backdrop-blur transition-colors hover:bg-white/15"
                >
                  <img
                    src={commissionImageMap[c.id] ?? parishImages.eglise}
                    alt=""
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold group-hover:text-gold">{c.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm opacity-80">{c.mission}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = statIcons[i] ?? Users
              return (
                <FadeIn key={stat.label} delay={i * 0.08}>
                  <div className="rounded-xl border bg-card p-4 text-center shadow-sm sm:p-6">
                    <Icon className="mx-auto mb-2 h-6 w-6 text-gold" aria-hidden />
                    <p className="text-2xl font-bold sm:text-3xl">
                      {stat.value.toLocaleString()}
                      {stat.label === t('home.statFaithful') && '+'}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <SectionHeading title={t('home.gallery')} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {photos.slice(0, 8).map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.04}>
                <Link to="/medias" className="group relative block overflow-hidden rounded-xl">
                  <img
                    src={img.src}
                    alt={content.media.imageTitles[img.id] ?? img.title}
                    className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>
              </FadeIn>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="min-h-11" asChild>
              <Link to="/medias">
                {t('home.fullGallery')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gold/10">
        <div className="container-wide text-center">
          <Heart className="mx-auto h-10 w-10 text-gold" aria-hidden />
          <h2 className="mt-4 text-xl font-bold md:text-2xl">{content.donations.spiritualIntro}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {content.donations.spiritualMessage}
          </p>
          <Button variant="gold" size="lg" className="mt-8 min-h-11" asChild>
            <Link to="/dons">{t('common.donate')}</Link>
          </Button>
        </div>
      </section>

      <HomeExploreSection />

      <section id="contact" className="section-padding">
        <div className="container-wide">
          <SectionHeading title={t('common.quickContact')} subtitle={t('common.contact')} />
          <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-3 md:gap-6">
            <FadeIn>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Phone className="mx-auto h-8 w-8 text-gold" aria-hidden />
                  <p className="mt-4 font-semibold">{t('footer.contactHours')}</p>
                  <a
                    href={`tel:${siteInfo.phone}`}
                    className="mt-2 block min-h-11 text-base text-muted-foreground hover:text-foreground"
                  >
                    {siteInfo.phoneDisplay}
                  </a>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.05}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Mail className="mx-auto h-8 w-8 text-gold" aria-hidden />
                  <p className="mt-4 font-semibold">{t('common.sendMessage')}</p>
                  <a
                    href="#laisser-un-message"
                    className="mt-2 block min-h-11 text-base text-muted-foreground hover:text-foreground"
                  >
                    {t('visitorMessage.title')}
                  </a>
                </CardContent>
              </Card>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <MapPin className="mx-auto h-8 w-8 text-gold" aria-hidden />
                  <p className="mt-4 font-semibold">{t('home.visitUs')}</p>
                  <a
                    href={siteConfig.map.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block min-h-11 text-base text-muted-foreground hover:text-foreground"
                  >
                    {siteInfo.address}
                  </a>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      <VisitorMessageSection />
    </>
  )
}
