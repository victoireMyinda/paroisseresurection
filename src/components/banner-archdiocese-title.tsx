import { useLanguage } from '@/i18n/language-provider'
import { cn } from '@/lib/utils'

interface BannerArchdioceseTitleProps {
  className?: string
}

/** Titre d'archidiocèse affiché en tête des bannières (hero, pages intérieures). */
export function BannerArchdioceseTitle({ className }: BannerArchdioceseTitleProps) {
  const { t } = useLanguage()

  return (
    <p
      className={cn(
        'font-display font-bold leading-tight tracking-tight text-gold',
        'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
        className,
      )}
    >
      {t('site.archdioceseBanner')}
    </p>
  )
}
