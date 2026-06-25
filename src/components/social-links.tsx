import { siteConfig } from '@/config/site'
import { socialLogos, type SocialNetwork } from '@/assets/social'
import { cn } from '@/lib/utils'

const socialNetworks: { id: SocialNetwork; name: string; url: string }[] = [
  { id: 'facebook', name: 'Facebook', url: siteConfig.social.facebook },
  { id: 'whatsapp', name: 'WhatsApp', url: siteConfig.social.whatsapp },
  { id: 'youtube', name: 'YouTube', url: siteConfig.social.youtube },
  { id: 'instagram', name: 'Instagram', url: siteConfig.social.instagram },
  { id: 'tiktok', name: 'TikTok', url: siteConfig.social.tiktok },
]

interface SocialLinksProps {
  variant?: 'footer' | 'icons'
  className?: string
}

export function SocialLinks({ variant = 'footer', className }: SocialLinksProps) {
  if (variant === 'icons') {
    return (
      <div className={cn('flex flex-wrap items-center gap-3', className)}>
        {socialNetworks.map((network) => (
          <a
            key={network.id}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={network.name}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border transition-transform hover:scale-110 hover:shadow-md"
          >
            <img
              src={socialLogos[network.id]}
              alt=""
              className="h-5 w-5"
              width={20}
              height={20}
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
