import { Phone, Mail } from 'lucide-react'
import { SocialLinks } from '@/components/social-links'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useSiteData } from '@/contexts/site-data-provider'

export function TopBar() {
  const { siteInfo } = useSiteData()

  return (
    <div className="border-b border-white/10 bg-gradient-to-r from-[#0c1929] via-primary to-[#0a3d8f] text-primary-foreground">
      <div className="container-wide flex min-h-10 flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-xs md:px-8">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href={`tel:${siteInfo.phone}`}
            className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            {siteInfo.phoneDisplay}
          </a>
          <a
            href={`mailto:${siteInfo.email}`}
            className="flex items-center gap-1.5 opacity-90 transition-opacity hover:opacity-100"
          >
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">{siteInfo.email}</span>
            <span className="sm:hidden">{siteInfo.email.split('@')[0]}…</span>
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
