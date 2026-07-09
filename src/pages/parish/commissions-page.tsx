import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ChevronDown, Users } from 'lucide-react'
import { parishSubNav } from '@/config/navigation'
import { PageShell } from '@/components/content/page-shell'
import { FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { parishImages } from '@/assets/parish-images'

export function ParishCommissionsPage() {
  const { t, content } = useLanguage()
  const { commissionImageMap, getBanner } = useSiteData()
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <PageShell
      title={t('nav.parish.commissions')}
      subtitle={t('home.discoverCommissions')}
      image={getBanner('/notre-paroisse/commissions', parishImages.chorale)}
      path="/notre-paroisse/commissions"
      subNav={parishSubNav}
    >
      <div className="space-y-8">
        {content.commissions.map((commission, i) => (
          <FadeIn key={commission.id} delay={i * 0.05}>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-[200px_1fr]">
                <div className="relative h-48 md:h-auto">
                  <img
                    src={commissionImageMap[commission.id] ?? parishImages.eglise}
                    alt={commission.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{commission.name}</CardTitle>
                        <p className="mt-1 text-sm font-medium text-gold">{commission.mission}</p>
                      </div>
                      <Badge>{commission.subCommissions.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{commission.description}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {commission.responsible}
                      </span>
                      <a
                        href={`mailto:${commission.contact}`}
                        className="flex items-center gap-1 text-primary hover:underline dark:text-gold"
                      >
                        <Mail className="h-4 w-4" />
                        {commission.contact}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => setExpanded(expanded === commission.id ? null : commission.id)}
                      className="mt-4 flex items-center gap-2 text-sm font-medium text-primary hover:underline dark:text-gold"
                      aria-expanded={expanded === commission.id}
                    >
                      {t('common.viewSubCommissions')}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded === commission.id ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expanded === commission.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 grid gap-3 sm:grid-cols-2"
                        >
                          {commission.subCommissions.map((sub) => (
                            <div key={sub.name} className="rounded-lg border bg-muted/50 p-4">
                              <h4 className="text-sm font-semibold">{sub.name}</h4>
                              <p className="mt-1 text-xs text-muted-foreground">{sub.description}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </div>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </PageShell>
  )
}
