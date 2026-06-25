import { useState, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { announcements } from '@/data'
import { pageBanners } from '@/assets/parish-images'
import { announcementCategories, type Announcement } from '@/types'
import { formatDate } from '@/lib/utils'

export function AnnouncementsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [dateFilter, setDateFilter] = useState('')

  const filtered = useMemo(() => {
    return announcements.filter((ann: Announcement) => {
      const matchesSearch =
        search === '' ||
        ann.title.toLowerCase().includes(search.toLowerCase()) ||
        ann.excerpt.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'all' || ann.category === category
      const matchesDate = dateFilter === '' || ann.date >= dateFilter
      return matchesSearch && matchesCategory && matchesDate
    })
  }, [search, category, dateFilter])

  return (
    <>
      <SEO
        title="Toutes les annonces"
        description="Communiqués, événements, retraites et annonces de la Paroisse de la Résurrection."
        path="/annonces"
      />
      <PageHeader
        title="Toutes les annonces"
        subtitle="Communiqués, événements et vie paroissiale"
        image={pageBanners.annonces}
      />

      <section className="section-padding">
        <div className="container-wide">
          <FadeIn>
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label htmlFor="search" className="mb-2 flex items-center gap-2">
                      <Search className="h-4 w-4" /> Recherche
                    </Label>
                    <Input
                      id="search"
                      placeholder="Rechercher une annonce..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="mb-2 flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Catégorie
                    </Label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="all">Toutes les catégories</option>
                      {Object.entries(announcementCategories).map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="date" className="mb-2">À partir du</Label>
                    <Input
                      id="date"
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <p className="mb-6 text-sm text-muted-foreground">
            {filtered.length} annonce{filtered.length !== 1 ? 's' : ''} trouvée{filtered.length !== 1 ? 's' : ''}
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((ann, i) => (
              <FadeIn key={ann.id} delay={i * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <Badge variant="gold" className="w-fit">
                      {announcementCategories[ann.category] ?? ann.category}
                    </Badge>
                    <CardTitle className="text-lg">{ann.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{formatDate(ann.date)}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{ann.excerpt}</p>
                    <p className="text-sm leading-relaxed">{ann.content}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Aucune annonce ne correspond à vos critères.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
