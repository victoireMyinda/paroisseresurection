import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EventMediaThumb } from '@/components/events/event-media'
import { formatDate } from '@/lib/utils'
import { useLanguage } from '@/i18n/language-provider'
import type { AnnouncementContent } from '@/i18n/content/types'

type AnnouncementCardProps = {
  ann: AnnouncementContent
  categories: Record<string, string>
  detailPath: string
}

export function AnnouncementCard({ ann, categories, detailPath }: AnnouncementCardProps) {
  const { t } = useLanguage()
  const hasMedia = Boolean(ann.media)

  return (
    <Card className={`flex h-full min-w-0 max-w-full flex-col overflow-hidden transition-shadow hover:shadow-md ${hasMedia ? 'pt-0' : ''}`}>
      {hasMedia && (
        <div className="relative h-40 w-full shrink-0">
          <EventMediaThumb media={ann.media} title={ann.title} />
        </div>
      )}
      <CardHeader className={hasMedia ? 'pt-4' : undefined}>
        <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
          <Badge variant="outline" className="max-w-full shrink break-words">
            {categories[ann.category] ?? ann.category}
          </Badge>
          <span className="shrink-0 text-xs text-muted-foreground">{formatDate(ann.date)}</span>
        </div>
        <CardTitle className="break-words text-base leading-snug sm:text-lg">{ann.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col min-w-0">
        <p className="line-clamp-3 text-sm text-muted-foreground break-words">{ann.excerpt}</p>
        <Button variant="link" className="mt-4 h-auto justify-start p-0" asChild>
          <Link to={detailPath}>
            {t('common.readMore')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
