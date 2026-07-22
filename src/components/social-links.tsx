import { siteConfig } from '@/config/site'
import { socialLogos, type SocialNetwork } from '@/assets/social'
import { useSiteData } from '@/contexts/site-data-provider'
import { cn } from '@/lib/utils'

const defaultNetworks: { id: SocialNetwork; name: string; url: string }[] = [
  { id: 'facebook', name: 'Facebook', url: siteConfig.social.facebook },
  { id: 'whatsapp', name: 'WhatsApp', url: siteConfig.social.whatsapp },
  { id: 'youtube', name: 'YouTube', url: siteConfig.social.youtube },
  { id: 'instagram', name: 'Instagram', url: siteConfig.social.instagram },
  { id: 'tiktok', name: 'TikTok', url: siteConfig.social.tiktok },
]

interface SocialLinksProps {
  variant?: 'footer' | 'icons'
  size?: 'sm' | 'md' | 'topBar'
  tone?: 'default' | 'onDark'
  nowrap?: boolean
  className?: string
}

const iconSizes = {
  sm: { button: 'h-7 w-7', img: 'h-3.5 w-3.5', imgPx: 14 },
  topBar: { button: 'h-8 w-8', img: 'h-3.5 w-3.5', imgPx: 14 },
  md: { button: 'h-10 w-10', img: 'h-5 w-5', imgPx: 20 },
} as const

export function SocialLinks({
  variant = 'footer',
  size = 'md',
  tone = 'default',
  nowrap = false,
  className,
}: SocialLinksProps) {
  const { siteInfo } = useSiteData()
  const socialNetworks = defaultNetworks.map((network) => ({
    ...network,
    url: siteInfo.social[network.id] ?? network.url,
  }))

  const dims = iconSizes[size]
  const iconButtonClass =
    tone === 'onDark'
      ? 'bg-[var(--chrome-pill)] ring-[var(--chrome-pill-ring)] hover:bg-white/12 hover:ring-white/20'
      : 'bg-background ring-border hover:shadow-md'

  if (variant === 'icons') {
    return (
      <div className={cn('flex items-center gap-2', nowrap ? 'flex-nowrap' : 'flex-wrap', className)}>
        {socialNetworks.map((network) => (
          <a
            key={network.id}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={network.name}
            className={cn(
              'flex shrink-0 items-center justify-center rounded-full shadow-sm ring-1 transition-colors hover:scale-105 active:scale-95',
              dims.button,
              iconButtonClass
            )}
          >
            <img
              src={socialLogos[network.id]}
              alt=""
              className={dims.img}
              width={dims.imgPx}
              height={dims.imgPx}
            />
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-wrap gap-3">
        {socialNetworks.map((network) => (
          <a
            key={network.id}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={network.name}
            title={network.name}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border transition-all hover:scale-110 hover:ring-gold/50 hover:shadow-md"
          >
            <img
              src={socialLogos[network.id]}
              alt=""
              className="h-6 w-6"
              width={24}
              height={24}
            />
          </a>
        ))}
      </div>
      <ul className="space-y-2 text-sm">
        {socialNetworks.map((network) => (
          <li key={network.id}>
            <a
              href={network.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <img
                src={socialLogos[network.id]}
                alt=""
                className="h-4 w-4"
                width={16}
                height={16}
              />
              {network.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
