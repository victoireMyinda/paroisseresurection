import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { navLinks, siteConfig } from '@/config/site'
import { parishImages } from '@/assets/parish-images'
import { SocialLinks } from '@/components/social-links'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-wide flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Accueil">
          <img
            src={parishImages.logo}
            alt="Paroisse de la Résurrection"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/50"
            width={40}
            height={40}
          />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-tight text-primary dark:text-gold">
              Paroisse de la
            </p>
            <p className="text-xs text-muted-foreground">Résurrection</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                location.pathname === link.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="gold" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/dons">Faire un don</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
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
            className="border-t lg:hidden"
            aria-label="Navigation mobile"
          >
            <div className="container-wide space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === link.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="gold" className="mt-2 w-full" asChild>
                <Link to="/dons" onClick={() => setMobileOpen(false)}>
                  Faire un don
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
  return (
    <footer className="border-t bg-muted/50">
      <div className="container-wide section-padding">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={parishImages.logo}
                alt="Paroisse de la Résurrection"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/50"
                width={48}
                height={48}
              />
              <div>
                <p className="font-semibold">{siteConfig.shortName}</p>
                <p className="text-sm text-muted-foreground">Lemba Salongo, Kinshasa</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{siteConfig.address.full}</li>
              <li>
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-foreground">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Réseaux sociaux</h3>
            <SocialLinks variant="footer" />
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="mt-1">Archidiocèse de Kinshasa — République Démocratique du Congo</p>
        </div>
      </div>
    </footer>
  )
}
