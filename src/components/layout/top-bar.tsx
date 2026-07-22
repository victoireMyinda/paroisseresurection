import type { ReactNode } from 'react'
import { Phone, Mail } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { cn } from '@/lib/utils'

function ContactPill({
  href,
  label,
  children,
  className,
}: {
  href: string
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs',
        'bg-[var(--chrome-pill)] ring-1 ring-inset ring-[var(--chrome-pill-ring)]',
        'transition-colors hover:bg-white/12 active:bg-white/15',
        className,
      )}
    >
      {children}
    </a>
  )
}

export function TopBar() {
  const { siteInfo } = useSiteData()
  const { t } = useLanguage()

  const hasPhone = Boolean(siteInfo.phone)
  const hasEmail = Boolean(siteInfo.email)

  if (!hasPhone && !hasEmail) {
    return (
      <div className="topbar-chrome">
        <div className="container-wide flex h-10 items-center justify-end px-3 sm:px-4 md:px-8">
          <LanguageSwitcher variant="compact" tone="onDark" hideGlobe />
        </div>
      </div>
    )
  }

  return (
    <div className="topbar-chrome">
      <div className="container-wide flex h-10 items-center justify-between gap-3 px-3 sm:px-4 md:px-8">
        <div
          className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3"
          role="group"
          aria-label="Contact"
        >
          {hasPhone ? (
            <ContactPill
              href={`tel:${siteInfo.phone}`}
              label={`${t('visitsPage.phone')}: ${siteInfo.phoneDisplay}`}
            >
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              <span className="truncate">{siteInfo.phoneDisplay}</span>
            </ContactPill>
          ) : null}

          {hasEmail ? (
            <ContactPill href={`mailto:${siteInfo.email}`} label={`Email: ${siteInfo.email}`}>
              <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
              <span className="sm:hidden">Mail</span>
              <span className="hidden truncate sm:inline">{siteInfo.email}</span>
            </ContactPill>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center border-l border-[var(--chrome-border)] pl-3">
          <LanguageSwitcher variant="compact" tone="onDark" hideGlobe />
        </div>
      </div>
    </div>
  )
}
