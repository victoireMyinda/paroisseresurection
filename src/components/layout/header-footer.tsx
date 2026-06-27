import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { useLanguage } from '@/i18n/language-provider'
import { siteConfig, usefulLinks } from '@/config/site'
import { parishImages } from '@/assets/parish-images'
import { SocialLinks } from '@/components/social-links'
import { MainNav, MobileNav } from '@/components/navigation/main-nav'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-wide flex h-16 items-center justify-between gap-2 px-4 md:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={t('common.home')}>
          <img
            src={parishImages.logo}
            alt={t('site.shortName')}
            className="h-11 w-11 rounded-full object-cover ring-2 ring-gold/50"
            width={44}
            height={44}
          />
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-primary dark:text-gold">
              {t('site.shortName')}
            </p>
            <p className="text-xs text-muted-foreground">{t('site.locationShort')}</p>
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
          <Button variant="gold" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/dons">{t('common.donate')}</Link>
          </Button>
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
            <div className="container-wide space-y-1 px-4 py-4">
              <MobileNav onNavigate={() => setMobileOpen(false)} />
              <Button variant="gold" className="mt-4 w-full" asChild>
                <Link to="/dons" onClick={() => setMobileOpen(false)}>
                  {t('common.donate')}
                </Link>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative mt-auto border-t border-[#d4dce8] bg-[#eef1f6] text-[#3d4f63] dark:border-[#2a3344] dark:bg-[#141a24] dark:text-[#c8d0dc]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="container-wide section-padding">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold text-[#1a3a6b] dark:text-gold">{t('footer.aboutUs')}</h3>
            <p className="text-sm leading-relaxed text-[#5a6d82] dark:text-[#9aa8b8]">
              {t('site.description')} {t('site.aboutExtra')}
            </p>
            <Link
              to="/notre-paroisse/histoire"
              className="mt-4 inline-block text-sm font-medium text-[#1a3a6b] hover:underline dark:text-gold"
            >
              {t('common.readMore')}
            </Link>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#1a3a6b] dark:text-gold">{t('footer.contactAddress')}</h3>
            <ul className="space-y-3 text-sm text-[#5a6d82] dark:text-[#9aa8b8]">
              <li>{siteConfig.address.full}</li>
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#1a3a6b] dark:hover:text-gold">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#1a3a6b] dark:hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.map.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1a3a6b] dark:hover:text-gold"
                >
                  {t('home.visitUs')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#1a3a6b] dark:text-gold">{t('footer.visitHours')}</h3>
            <p className="text-sm font-medium text-[#3d4f63] dark:text-[#c8d0dc]">{t('footer.parishOffice')}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#5a6d82] dark:text-[#9aa8b8]">
              {siteConfig.contact.officeHours}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-[#1a3a6b] dark:text-gold">{t('footer.usefulLinks')}</h3>
            <ul className="space-y-2 text-sm">
              {usefulLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5a6d82] transition-colors hover:text-[#1a3a6b] dark:text-[#9aa8b8] dark:hover:text-gold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-[#d4dce8] pt-8 dark:border-[#2a3344]">
          <SocialLinks variant="icons" size="sm" />
          <div className="text-center text-sm text-[#7a8c9e] dark:text-[#7a8796]">
            <p>
              © {new Date().getFullYear()} {t('site.name')}. {t('site.copyright')}
            </p>
            <p className="mt-1">{t('site.archdiocese')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
