import { useParams, Navigate } from 'react-router-dom'
import { churchSubNav, churchSectionIds, type ChurchSectionId } from '@/config/navigation'
import { PageShell, ContentBlocks } from '@/components/content/page-shell'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import { parishImages } from '@/assets/parish-images'

const sectionBanners: Partial<Record<ChurchSectionId, string>> = {
  histoire: parishImages.eglise,
  sacrements: parishImages.chorale,
  bible: parishImages.paroisse,
  saints: parishImages.statutmarie,
  prieres: parishImages.grotte,
}

export function ChurchSectionPage() {
  const { section } = useParams<{ section: string }>()
  const { content } = useLanguage()
  const { getBanner } = useSiteData()

  if (!section || !churchSectionIds.includes(section as ChurchSectionId)) {
    return <Navigate to="/eglise/histoire" replace />
  }

  const sectionId = section as ChurchSectionId
  const data = content.church[sectionId]

  return (
    <PageShell
      title={data.title}
      subtitle={data.subtitle}
      image={getBanner(`/eglise/${sectionId}`, sectionBanners[sectionId] ?? parishImages.eglise)}
      path={`/eglise/${sectionId}`}
      subNav={churchSubNav}
    >
      <ContentBlocks blocks={data.blocks} />
    </PageShell>
  )
}
