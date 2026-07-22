import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { BannerArchdioceseTitle } from '@/components/banner-archdiocese-title'
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
  subtitle?: string
  image?: string
}

export function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden py-16 text-primary-foreground md:py-20">
      {image ? (
        <>
          <img
            src={image}
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
          className="mb-3 md:mb-4"
        >
          <BannerArchdioceseTitle />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-3xl font-bold md:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg opacity-90"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
