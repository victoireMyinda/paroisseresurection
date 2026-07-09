import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/config/site'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { VisitorMessageSection } from '@/components/contact/visitor-message-section'

export function ContactPage() {
  const { t } = useLanguage()
  const { siteInfo, getBanner } = useSiteData()

  const contactItems = [
    {
      icon: MapPin,
      title: t('footer.contactAddress'),
      content: siteInfo.address || siteConfig.address.full,
      link: siteConfig.map.link,
    },
    {
      icon: Phone,
      title: t('footer.contactHours'),
      content: siteInfo.phoneDisplay || siteConfig.contact.phoneDisplay,
      link: siteInfo.phone ? `tel:${siteInfo.phone}` : `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: Mail,
      title: t('common.contact'),
      content: siteInfo.email || siteConfig.contact.email,
      link: siteInfo.email ? `mailto:${siteInfo.email}` : `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Clock,
      title: t('footer.visitHours'),
      content: siteInfo.officeHours || siteConfig.contact.officeHours,
    },
  ]

  return (
    <>
      <SEO
        title={t('common.contact')}
        description={t('visitorMessage.subtitle')}
        path="/contact"
      />
      <PageHeader
        title={t('common.contact')}
        subtitle={t('visitorMessage.subtitle')}
        image={getBanner('/contact')}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <Card className="h-full">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary dark:text-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.icon === MapPin ? '_blank' : undefined}
                          rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                          className="mt-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-12 overflow-hidden rounded-xl border">
              <iframe
                title="Localisation de la Paroisse de la Résurrection"
                src={siteConfig.map.embedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <VisitorMessageSection />
    </>
  )
}
