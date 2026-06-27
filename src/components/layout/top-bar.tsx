import { Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { SocialLinks } from '@/components/social-links'
import { LanguageSwitcher } from '@/components/language-switcher'

export function TopBar() {
  return (
    <div className="border-b bg-primary text-primary-foreground">
      <div className="container-wide flex min-h-10 flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs md:px-8">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {siteConfig.contact.phoneDisplay}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{siteConfig.contact.email}</span>
            <span className="sm:hidden">{siteConfig.contact.email.split('@')[0]}…</span>
          </a>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher variant="compact" tone="onDark" />
          <div className="hidden h-4 w-px bg-white/20 sm:block" />
          <SocialLinks variant="icons" size="sm" tone="onDark" />
        </div>
      </div>
    </div>
  )
}
