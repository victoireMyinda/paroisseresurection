import { parishSubNav } from '@/config/navigation'
import { PageShell, ContentBlocks } from '@/components/content/page-shell'
import { FadeIn } from '@/components/section-heading'
import { useLanguage } from '@/i18n/language-provider'
import { parishImages } from '@/assets/parish-images'

export function ParishHistoryPage() {
  const { content } = useLanguage()
  const { history } = content.parish

  return (
    <PageShell
      title={history.title}
      subtitle={content.parish.historySummary}
      image={parishImages.paroisse}
      path="/notre-paroisse/histoire"
      subNav={parishSubNav}
    >
      <ContentBlocks blocks={history.sections} />
    </PageShell>
  )
}

export function ParishCuratesPage() {
  const { t, content } = useLanguage()

  return (
    <PageShell
      title={t('nav.parish.curates')}
      subtitle={t('site.description')}
      image={parishImages.eglise}
      path="/notre-paroisse/cures"
      subNav={parishSubNav}
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 top-0 hidden h-full w-px bg-border md:block" />
        <div className="space-y-12">
          {content.parish.curates.map((curate, i) => (
            <FadeIn key={curate.name} delay={i * 0.08}>
              <div className="relative md:pl-12">
                <div className="absolute left-2 top-6 hidden h-4 w-4 rounded-full border-4 border-gold bg-background md:block" />
                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm md:grid md:grid-cols-[180px_1fr]">
                  {curate.image && (
                    <img src={curate.image} alt={curate.name} className="h-48 w-full object-cover md:h-full" />
                  )}
                  <div className="p-6">
                    <p className="text-sm font-medium text-gold">{curate.period}</p>
                    <h2 className="mt-1 text-xl font-bold">{curate.name}</h2>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {curate.achievements.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span className="text-gold">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
