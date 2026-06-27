import { Globe } from 'lucide-react'
import { useLanguage } from '@/i18n/language-provider'
import type { Locale } from '@/i18n/locales'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  variant?: 'header' | 'compact'
  tone?: 'default' | 'onDark'
  className?: string
}

export function LanguageSwitcher({ variant = 'header', tone = 'default', className }: LanguageSwitcherProps) {
  const { locale, setLocale, languages, t } = useLanguage()

  return (
    <div className={cn('relative', className)}>
      <label htmlFor="language-select" className="sr-only">
        {t('common.language')}
      </label>
      <div className="flex items-center gap-1.5">
        <Globe
          className={cn(
            'h-3.5 w-3.5 shrink-0',
            tone === 'onDark' ? 'text-white/80' : 'text-muted-foreground'
          )}
          aria-hidden
        />
        <select
          id="language-select"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className={cn(
            'cursor-pointer rounded-md border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            variant === 'header' ? 'h-9 px-2' : 'h-7 px-1.5 text-xs',
            tone === 'onDark'
              ? 'lang-on-dark border-white/30 bg-[#0a3568] text-white hover:bg-[#0c4280]'
              : 'border-input bg-background'
          )}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-[#0D47A1] text-white">
              {lang.nativeLabel}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
