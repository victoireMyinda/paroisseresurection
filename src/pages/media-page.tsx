import { useState } from 'react'
import { Download, Share2, X, Play } from 'lucide-react'
import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { galleryImages, galleryVideos } from '@/data'
import { pageBanners } from '@/assets/parish-images'
import { siteConfig } from '@/config/site'

export function MediaPage() {
  const [lightbox, setLightbox] = useState<{
    title: string
    src?: string
    embedUrl?: string
  } | null>(null)

  const shareImage = async (title: string) => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title, url })
    } else {
      await navigator.clipboard.writeText(url)
      alert('Lien copié dans le presse-papiers')
    }
  }

  const downloadImage = (src: string, title: string) => {
    const a = document.createElement('a')
    a.href = src
    a.download = `${title.replace(/\s+/g, '-').toLowerCase()}.webp`
    a.click()
  }

  return (
    <>
      <SEO
        title="Médias"
        description="Galerie photos et vidéos de la Paroisse de la Résurrection."
        path="/medias"
      />
      <PageHeader
        title="Médias"
        subtitle="Galerie photos et vidéos de la vie paroissiale"
        image={pageBanners.medias}
      />

      <section className="section-padding">
        <div className="container-wide">
          <Tabs defaultValue="images">
            <TabsList className="mb-8">
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Vidéos</TabsTrigger>
            </TabsList>

            <TabsContent value="images">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {galleryImages.map((img, i) => (
                  <FadeIn key={img.id} delay={i * 0.05}>
                    <div className="group relative overflow-hidden rounded-xl border">
                      <button
                        type="button"
                        onClick={() => setLightbox({ title: img.title, src: img.src })}
                        className="block w-full"
                        aria-label={`Voir ${img.title}`}
                      >
                        <img
                          src={img.src}
                          alt={img.title}
                          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      </button>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-sm font-medium text-white">{img.title}</p>
                        <p className="text-xs text-white/70">{img.category}</p>
                      </div>
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => downloadImage(img.src, img.title)}
                          aria-label="Télécharger"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8"
                          onClick={() => shareImage(img.title)}
                          aria-label="Partager"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {galleryVideos.map((video, i) => (
                  <FadeIn key={video.id} delay={i * 0.1}>
                    <button
                      type="button"
                      className="group w-full overflow-hidden rounded-xl border text-left transition-shadow hover:shadow-md"
                      onClick={() =>
                        video.embedUrl
                          ? setLightbox({ title: video.title, embedUrl: video.embedUrl })
                          : video.watchUrl && video.watchUrl !== '#'
                            ? window.open(video.watchUrl, '_blank', 'noopener,noreferrer')
                            : undefined
                      }
                      disabled={!video.embedUrl && (!video.watchUrl || video.watchUrl === '#')}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors group-hover:bg-black/50">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-[#0a0a0a]">
                            <Play className="h-6 w-6 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {video.embedUrl ? 'YouTube — Paroisse de la Résurrection' : 'Vidéo à venir'}
                        </p>
                      </div>
                    </button>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-label={lightbox.title}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
          {lightbox.embedUrl ? (
            <div className="w-full max-w-4xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  title={lightbox.title}
                  src={lightbox.embedUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-4 text-center text-white">{lightbox.title}</p>
            </div>
          ) : lightbox.src ? (
            <>
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-h-[90vh] max-w-full rounded-lg object-contain"
              />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white">
                {lightbox.title}
              </p>
            </>
          ) : null}
        </div>
      )}
    </>
  )
}
