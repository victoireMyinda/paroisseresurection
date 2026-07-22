import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon, MapPin, Phone, Mail, Clock, ExternalLink, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { siteConfig, usefulLinks } from '@/config/site'
import { siteMenuGroups } from '@/config/navigation'
import { parishImages } from '@/assets/parish-images'
import { SocialLinks } from '@/components/social-links'
import { MainNav, MobileNav } from '@/components/navigation/main-nav'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const { siteInfo } = useSiteData()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md supports-[backdrop-filter]:bg-background/85 dark:shadow-[0_1px_0_rgba(255,255,255,0.05)]">
      <div className="container-wide flex min-h-[4.25rem] items-center justify-between gap-2 px-3 py-1.5 sm:gap-3 sm:px-4 md:px-8">
        <Link to="/" className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3" aria-label={t('common.home')}>
          <img
            src={siteInfo.logoUrl || parishImages.logo}
            alt={t('site.shortName')}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-gold/40 transition-shadow group-hover:ring-gold/60 dark:ring-gold/25 dark:group-hover:ring-gold/40 sm:h-11 sm:w-11"
            width={44}
            height={44}
          />
          <div className="min-w-0 flex-1 space-y-px leading-none sm:space-y-0.5">
            <p className="truncate text-[0.5625rem] font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.625rem]">
              {siteInfo.headerArchdiocese}
            </p>
            <p className="truncate text-[0.5625rem] font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.625rem]">
              {siteInfo.headerDeanery}
            </p>
            <p className="truncate font-display text-[0.625rem] font-bold tracking-tight text-primary sm:text-sm">
              {siteInfo.headerParish}
            </p>
            <p className="truncate text-[0.5625rem] font-medium uppercase tracking-wider text-muted-foreground sm:text-[0.6875rem]">
              {siteInfo.headerLocation}
            </p>
          </div>
        </Link>

        <MainNav />

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          {/* Désactivé temporairement — relance prévue
          <Button variant="gold" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/dons">{t('common.donate')}</Link>
          </Button>
          */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t('common.menu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t xl:hidden"
            aria-label={t('footer.navigation')}
          >
            <div className="container-wide max-h-[70vh] overflow-y-auto px-4 py-4">
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="footer-gold-accent mb-5 font-display text-base font-semibold text-gold">
      {children}
      <span className="mt-2.5 block h-0.5 w-10 rounded-full bg-gradient-to-r from-gold/80 to-gold/20" aria-hidden />
    </h3>
  )
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  const className =
    'group inline-flex items-center gap-1.5 text-sm text-[var(--chrome-muted)] transition-colors hover:text-[var(--chrome-fg)]'

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        <span>{children}</span>
        <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-opacity group-hover:opacity-100" aria-hidden />
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      <span>{children}</span>
      <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-70" aria-hidden />
    </Link>
  )
}

export function Footer() {
  const { t } = useLanguage()
  const { siteInfo } = useSiteData()

  return (
    <footer className="footer-chrome relative mt-auto overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.07] dark:opacity-[0.04]"
        style={{ backgroundImage: `url(${parishImages.paroisse})` }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(196,176,120,0.06),transparent)]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent dark:via-gold/30" />

      <div className="container-wide relative px-4 py-14 md:px-8 md:py-16 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link to="/" className="group mb-5 inline-flex items-center gap-3.5">
              <img
                src={siteInfo.logoUrl || parishImages.logo}
                alt=""
                className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/50 transition-shadow group-hover:ring-gold/80"
                width={56}
                height={56}
              />
              <div>
                <p className="font-display text-lg font-bold leading-tight text-[var(--chrome-fg)]">
                  {siteInfo.primaryTitle || t('site.shortName')}
                </p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--chrome-muted)]">
                  {siteInfo.secondaryTitle || t('site.locationShort')}
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--chrome-muted)]">
              {t('site.description')} {t('site.aboutExtra')}
            </p>

            <Link
              to="/notre-paroisse/histoire"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold/90 transition-colors hover:text-gold/80 dark:hover:text-primary"
            >
              {t('common.readMore')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <Link
              to="/#explorer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold/90 transition-colors hover:text-gold/80 dark:hover:text-primary"
            >
              {t('home.exploreSite')}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>

            <div className="mt-8">
              <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold/90">
                {t('footer.followUs')}
              </p>
              <SocialLinks variant="icons" size="md" tone="onDark" />
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>{t('home.priorityNav')}</FooterHeading>
            <ul className="space-y-2">
              {siteMenuGroups
                .filter((g) => g.priority)
                .flatMap((group) =>
                  group.children.length > 0
                    ? group.children.map((child) => (
                        <li key={child.href}>
                          <FooterLink href={child.href}>{t(child.key)}</FooterLink>
                        </li>
                      ))
                    : group.href
                      ? [
                          <li key={group.href}>
                            <FooterLink href={group.href}>{t(group.key)}</FooterLink>
                          </li>,
                        ]
                      : [],
                )}
            </ul>
            <div className="mt-6">
              <FooterHeading>{t('nav.media')}</FooterHeading>
              <FooterLink href="/medias">{t('common.seeAll')}</FooterLink>
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>{t('nav.parish')}</FooterHeading>
            <ul className="space-y-2">
              {siteMenuGroups.find((g) => g.key === 'nav.parish')!.children.map((child) => (
                <li key={child.href}>
                  <FooterLink href={child.href}>{t(child.key)}</FooterLink>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <FooterHeading>{t('nav.services')}</FooterHeading>
              <ul className="space-y-2">
                {siteMenuGroups.find((g) => g.key === 'nav.services')!.children.map((child) => (
                  <li key={child.href}>
                    <FooterLink href={child.href}>{t(child.key)}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{t('nav.church')}</FooterHeading>
            <ul className="columns-1 gap-x-4 space-y-2 sm:columns-2">
              {siteMenuGroups.find((g) => g.key === 'nav.church')!.children.map((child) => (
                <li key={child.href} className="break-inside-avoid">
                  <FooterLink href={child.href}>{t(child.key)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <FooterHeading>{t('footer.contactAddress')}</FooterHeading>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                <span className="text-[var(--chrome-muted)] leading-relaxed">{siteInfo.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                <a href={`tel:${siteInfo.phone}`} className="text-[var(--chrome-muted)] transition-colors hover:text-[var(--chrome-fg)]">
                  {siteInfo.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                <a href={`mailto:${siteInfo.email}`} className="break-all text-[var(--chrome-muted)] transition-colors hover:text-[var(--chrome-fg)]">
                  {siteInfo.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                <a
                  href={siteConfig.map.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--chrome-muted)] transition-colors hover:text-[var(--chrome-fg)]"
                >
                  {t('home.visitUs')}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <FooterHeading>{t('footer.usefulLinks')}</FooterHeading>
              <ul className="space-y-2.5">
                {usefulLinks.map((link) => (
                  <li key={link.url}>
                    <FooterLink href={link.url} external>
                      {link.name}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-xl border border-[var(--chrome-border)] bg-[var(--chrome-pill)] p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-[var(--chrome-fg)]">{t('footer.parishOffice')}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--chrome-muted)]">{siteInfo.officeHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--chrome-border)] pt-8 text-center text-sm text-[var(--chrome-muted)] md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {t('site.name')}. {t('site.copyright')}
          </p>
          <p className="max-w-xl md:text-right">{t('site.archdiocese')}</p>
        </div>
      </div>
    </footer>
  )
}
