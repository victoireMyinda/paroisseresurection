import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BannerArchdioceseTitle } from '@/components/banner-archdiocese-title'
import { BannerHeadingTitle } from '@/components/banner-heading-title'
import { useSiteData } from '@/contexts/site-data-provider'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <div
        className={cn(
          'mt-3 h-1 w-16 rounded-full bg-gold',
          align === 'center' && 'mx-auto'
        )}
      />
      {subtitle && (
        <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PageHeaderProps {
  title: string
  titleLine2?: string
  subtitle?: string
  image?: string
  path?: string
}

export function PageHeader({ title, titleLine2, subtitle, image, path }: PageHeaderProps) {
  const { getPageBanner } = useSiteData()
  const cms = path ? getPageBanner(path) : undefined
  const resolvedTitle = cms?.title || title
  const resolvedTitleLine2 = cms?.titleLine2 || titleLine2
  const resolvedSubtitle = cms?.description || subtitle
  const resolvedImage = cms?.imageUrl || image

  return (
    <section className="relative overflow-hidden py-12 text-primary-foreground md:py-16">
      {resolvedImage ? (
        <>
          <img
            src={resolvedImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="hero-overlay absolute inset-0" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
        </>
      )}
      <div className="container-wide relative px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 md:mb-3"
        >
          <BannerArchdioceseTitle className="text-base sm:text-lg md:text-xl lg:text-2xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <BannerHeadingTitle
            title={resolvedTitle}
            titleLine2={resolvedTitleLine2}
            className="text-2xl font-bold leading-tight md:text-4xl"
          />
        </motion.div>
        {resolvedSubtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-3 max-w-2xl text-sm opacity-90 md:mt-4 md:text-base"
          >
            {resolvedSubtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
