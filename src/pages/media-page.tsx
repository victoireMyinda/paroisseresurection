import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Download, Share2, X, Play } from 'lucide-react'
import { SEO } from '@/components/seo'
import { PageHeader, FadeIn } from '@/components/section-heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { parishImages } from '@/assets/parish-images'
import { useLanguage } from '@/i18n/language-provider'
import { useSiteData } from '@/contexts/site-data-provider'
import mediaData from '@/data/media.json'
import type { GalleryImage } from '@/assets/parish-images'

const MEDIA_ALL_CATEGORY = 'Tout'
const MEDIA_FILTER_PILLS = mediaData.categories.map((label) => ({
  id: label === MEDIA_ALL_CATEGORY ? 'all' : label,
  label,
}))

type VideoLightbox = {
  title: string
  subtitle?: string
  embedUrl?: string
  videoUrl?: string
}

export function MediaPage() {
  const { t, content } = useLanguage()
  const { galleryImages, galleryVideos, getBanner } = useSiteData()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVideoCategory, setSelectedVideoCategory] = useState('all')
  const [photoLightboxIndex, setPhotoLightboxIndex] = useState<number | null>(null)
  const [videoLightbox, setVideoLightbox] = useState<VideoLightbox | null>(null)

  const getPhotoTitle = useCallback(
    (img: GalleryImage) => content.media.imageTitles[img.id] ?? img.title,
    [content.media.imageTitles],
  )

  const getPhotoCategory = useCallback(
    (img: GalleryImage) => content.media.galleryCategories[img.category] ?? img.category,
    [content.media.galleryCategories],
  )

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

  const photoCategories = MEDIA_FILTER_PILLS
  const filteredImages =
    selectedCategory === 'all' ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)
  const videoCategories = MEDIA_FILTER_PILLS
  const filteredVideos =
    selectedVideoCategory === 'all'
      ? galleryVideos
      : galleryVideos.filter((video) => video.category === selectedVideoCategory)

  const activePhoto = photoLightboxIndex !== null ? filteredImages[photoLightboxIndex] : null

  const goToPrevPhoto = useCallback(() => {
    setPhotoLightboxIndex((index) => {
      if (index === null || filteredImages.length === 0) return null
      return (index - 1 + filteredImages.length) % filteredImages.length
    })
  }, [filteredImages.length])

  const goToNextPhoto = useCallback(() => {
    setPhotoLightboxIndex((index) => {
      if (index === null || filteredImages.length === 0) return null
      return (index + 1) % filteredImages.length
    })
  }, [filteredImages.length])

  const openPhotoLightbox = (index: number) => {
    setVideoLightbox(null)
    setPhotoLightboxIndex(index)
  }

  const closePhotoLightbox = () => setPhotoLightboxIndex(null)

  useEffect(() => {
    if (photoLightboxIndex !== null && photoLightboxIndex >= filteredImages.length) {
      setPhotoLightboxIndex(null)
    }
  }, [filteredImages.length, photoLightboxIndex])

  useEffect(() => {
    if (photoLightboxIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePhotoLightbox()
      if (event.key === 'ArrowLeft') goToPrevPhoto()
      if (event.key === 'ArrowRight') goToNextPhoto()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [photoLightboxIndex, goToPrevPhoto, goToNextPhoto])

  return (
    <>
      <SEO title={t('nav.media')} description={t('home.gallery')} path="/medias" />
      <PageHeader title={t('nav.media')} subtitle={t('home.gallery')} image={getBanner('/medias', parishImages.chorale)} />

      <section className="section-padding">
        <div className="container-wide">
          <Tabs defaultValue="images">
            <TabsList className="mb-8">
              <TabsTrigger value="images">{t('common.photos')}</TabsTrigger>
              <TabsTrigger value="videos">{t('common.videos')}</TabsTrigger>
              <TabsTrigger value="albums">{t('common.albums')}</TabsTrigger>
            </TabsList>

            <TabsContent value="images">
              <div className="mb-6 flex flex-wrap gap-2">
                {photoCategories.map((category) => (
                  <Button
                    key={category.id}
                    type="button"
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.id)}
                    className="rounded-full"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {filteredImages.map((img, i) => (
                  <FadeIn key={img.id} delay={i * 0.05}>
                    <button
                      type="button"
                      onClick={() => openPhotoLightbox(i)}
                      className="group block w-full overflow-hidden rounded-xl border text-left transition-shadow hover:shadow-md"
                      aria-label={`Voir ${getPhotoTitle(img)}`}
                    >
                      <img
                        src={img.thumbSrc || img.src}
                        alt={getPhotoTitle(img)}
                        className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="p-3">
                        <p className="line-clamp-2 text-sm font-medium leading-snug">{getPhotoTitle(img)}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{getPhotoCategory(img)}</p>
                      </div>
                    </button>
                  </FadeIn>
                ))}
              </div>
              {filteredImages.length === 0 && (
                <p className="mt-6 text-sm text-muted-foreground">Aucune photo dans cette catégorie.</p>
              )}
            </TabsContent>

            <TabsContent value="videos">
              <div className="mb-6 flex flex-wrap gap-2">
                {videoCategories.map((category) => (
                  <Button
                    key={category.id}
                    type="button"
                    variant={selectedVideoCategory === category.id ? 'default' : 'outline'}
                    onClick={() => setSelectedVideoCategory(category.id)}
                    className="rounded-full"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredVideos.map((video, i) => (
                  <FadeIn key={video.id} delay={i * 0.1}>
                    <button
                      type="button"
                      className="group w-full overflow-hidden rounded-xl border text-left transition-shadow hover:shadow-md"
                      onClick={() => {
                        setPhotoLightboxIndex(null)
                        if (video.embedUrl) {
                          setVideoLightbox({
                            title: video.title,
                            subtitle: video.description || 'YouTube — Paroisse de la Résurrection',
                            embedUrl: video.embedUrl,
                          })
                        } else if (video.videoUrl) {
                          setVideoLightbox({
                            title: video.title,
                            subtitle: video.description,
                            videoUrl: video.videoUrl,
                          })
                        } else if (video.watchUrl && video.watchUrl !== '#') {
                          window.open(video.watchUrl, '_blank', 'noopener,noreferrer')
                        }
                      }}
                      disabled={!video.embedUrl && !video.videoUrl && (!video.watchUrl || video.watchUrl === '#')}
                      aria-label={`Lire ${video.title}`}
                    >
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-[#0a0a0a] sm:h-14 sm:w-14">
                            <Play className="ml-1 h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="line-clamp-2 text-sm font-medium leading-snug">{video.title}</p>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                          {video.description || (video.embedUrl ? 'YouTube — Paroisse de la Résurrection' : 'Vidéo à venir')}
                        </p>
                      </div>
                    </button>
                  </FadeIn>
                ))}
              </div>
              {filteredVideos.length === 0 && (
                <p className="mt-6 text-sm text-muted-foreground">Aucune vidéo dans cette catégorie.</p>
              )}
            </TabsContent>

            <TabsContent value="albums">
              <div className="grid gap-8 md:grid-cols-3">
                {content.media.albums.map((album, i) => (
                  <FadeIn key={album.id} delay={i * 0.08}>
                    <div className="overflow-hidden rounded-xl border">
                      <div className="grid grid-cols-2 gap-0.5">
                        {(album.imageIds ?? []).slice(0, 4).map((id) => {
                          const img = galleryImages.find((g) => g.id === id)
                          return img ? (
                            <img key={id} src={img.thumbSrc || img.src} alt="" className="aspect-square object-cover" loading="lazy" />
                          ) : null
                        })}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{album.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{album.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lightbox photos — navigation slider */}
      {activePhoto && photoLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-label={getPhotoTitle(activePhoto)}
          onClick={closePhotoLightbox}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              closePhotoLightbox()
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>

          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  goToPrevPhoto()
                }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                aria-label={t('common.prevSlide')}
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  goToNextPhoto()
                }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-16"
                aria-label={t('common.nextSlide')}
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div
            className="flex max-h-[90vh] max-w-full flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.src || activePhoto.thumbSrc}
              alt={getPhotoTitle(activePhoto)}
              className="max-h-[75vh] max-w-full rounded-lg object-contain"
            />
            <div className="mt-4 text-center text-white">
              <p className="font-medium">{getPhotoTitle(activePhoto)}</p>
              <p className="mt-1 text-sm text-white/70">{getPhotoCategory(activePhoto)}</p>
              {filteredImages.length > 1 && (
                <p className="mt-2 text-xs text-white/50">
                  {photoLightboxIndex + 1} / {filteredImages.length}
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  downloadImage(activePhoto.src || activePhoto.thumbSrc || '', getPhotoTitle(activePhoto))
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button size="sm" variant="secondary" onClick={() => shareImage(getPhotoTitle(activePhoto))}>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox vidéos */}
      {videoLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-label={videoLightbox.title}
        >
          <button
            type="button"
            onClick={() => setVideoLightbox(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            aria-label="Fermer"
          >
            <X className="h-6 w-6" />
          </button>
          {videoLightbox.embedUrl ? (
            <div className="w-full max-w-4xl">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  title={videoLightbox.title}
                  src={videoLightbox.embedUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 text-center text-white">
                <p className="font-medium">{videoLightbox.title}</p>
                {videoLightbox.subtitle && <p className="mt-1 text-sm text-white/70">{videoLightbox.subtitle}</p>}
              </div>
            </div>
          ) : videoLightbox.videoUrl ? (
            <div className="w-full max-w-4xl">
              <video src={videoLightbox.videoUrl} controls className="max-h-[90vh] w-full rounded-lg bg-black" />
              <div className="mt-4 text-center text-white">
                <p className="font-medium">{videoLightbox.title}</p>
                {videoLightbox.subtitle && <p className="mt-1 text-sm text-white/70">{videoLightbox.subtitle}</p>}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}
