import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'
import { pageBanners } from '@/assets/parish-images'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  const contactItems = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: siteConfig.address.full,
      link: siteConfig.map.link,
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: siteConfig.contact.phoneDisplay,
      link: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: Mail,
      title: 'Email',
      content: siteConfig.contact.email,
      link: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Clock,
      title: 'Horaires du secrétariat',
      content: siteConfig.contact.officeHours,
    },
  ]

  return (
    <>
      <SEO
        title="Contact"
        description="Contactez la Paroisse Catholique de la Résurrection à Lemba Salongo, Kinshasa."
        path="/contact"
      />
      <PageHeader
        title="Contact"
        subtitle="Nous sommes à votre écoute"
        image={pageBanners.contact}
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <div className="space-y-6">
                {contactItems.map((item) => (
                  <Card key={item.title}>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary dark:text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            target={item.title === 'Adresse' ? '_blank' : undefined}
                            rel={item.title === 'Adresse' ? 'noopener noreferrer' : undefined}
                            className="mt-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>Envoyez-nous un message</CardTitle>
                </CardHeader>
                <CardContent>
                  {sent && (
                    <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="contact-name">Nom</Label>
                      <Input
                        id="contact-name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-subject">Sujet</Label>
                      <Input
                        id="contact-subject"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-message">Message</Label>
                      <Textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="h-4 w-4" />
                      Envoyer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
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
    </>
  )
}
