import { ChevronDown, Globe } from 'lucide-react'
import { useLanguage } from '@/i18n/language-provider'
import type { Locale } from '@/i18n/locales'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface LanguageSwitcherProps {
  variant?: 'header' | 'compact'
  tone?: 'default' | 'onDark'
  hideGlobe?: boolean
  className?: string
}

export function LanguageSwitcher({
  variant = 'header',
  tone = 'default',
  hideGlobe = false,
  className,
}: LanguageSwitcherProps) {
  const { locale, setLocale, languages, t } = useLanguage()
  const current = languages.find((lang) => lang.code === locale) ?? languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t('common.language')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
            variant === 'header' ? 'h-9 px-3 text-sm' : 'h-8 px-2.5 text-xs',
            tone === 'onDark'
              ? 'border border-[var(--chrome-border)] bg-[var(--chrome-pill)] text-[var(--chrome-fg)] hover:bg-white/10'
              : 'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
            className,
          )}
        >
          {!hideGlobe ? (
            <Globe
              className={cn('h-3.5 w-3.5 shrink-0', tone === 'onDark' ? 'opacity-80' : 'text-muted-foreground')}
              aria-hidden
            />
          ) : null}
          <span className="max-w-[6.5rem] truncate sm:max-w-none">{current.nativeLabel}</span>
          <ChevronDown
            className={cn('h-3.5 w-3.5 shrink-0 opacity-60', tone === 'onDark' ? 'text-[var(--chrome-fg)]' : 'text-muted-foreground')}
            aria-hidden
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 p-1.5">
        <DropdownMenuLabel className="px-2.5 py-1.5 text-[0.6875rem]">
          {t('common.language')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuRadioGroup value={locale} onValueChange={(value) => setLocale(value as Locale)}>
          {languages.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.code}
              value={lang.code}
              className={cn(
                'cursor-pointer py-2.5 pl-8 pr-2.5',
                locale === lang.code && 'bg-primary/10 font-medium text-primary focus:bg-primary/10 focus:text-primary',
              )}
            >
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="leading-none">{lang.nativeLabel}</span>
                {lang.label !== lang.nativeLabel ? (
                  <span className="text-[0.6875rem] font-normal leading-none text-muted-foreground">
                    {lang.label}
                  </span>
                ) : null}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
