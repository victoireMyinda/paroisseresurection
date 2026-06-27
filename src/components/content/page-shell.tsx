import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo'
import { PageHeader } from '@/components/section-heading'
import type { NavItem } from '@/config/navigation'
import { SubNav } from '@/components/navigation/sub-nav'

interface PageShellProps {
  title: string
  subtitle?: string
  image?: string
  seoTitle?: string
  seoDescription?: string
  path: string
  subNav?: NavItem[]
  children: ReactNode
}

export function PageShell({
  title,
  subtitle,
  image,
  seoTitle,
  seoDescription,
  path,
  subNav,
  children,
}: PageShellProps) {
  return (
    <>
      <SEO title={seoTitle ?? title} description={seoDescription ?? subtitle} path={path} />
      <PageHeader title={title} subtitle={subtitle} image={image} />
      {subNav && <SubNav items={subNav} />}
      <section className="section-padding">
        <div className="container-wide">{children}</div>
      </section>
    </>
  )
}

interface ContentBlocksProps {
  blocks: { heading?: string; paragraphs: string[] }[]
}

export function ContentBlocks({ blocks }: ContentBlocksProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {blocks.map((block, i) => (
        <article key={i}>
          {block.heading && (
            <h2 className="mb-4 text-2xl font-bold text-primary dark:text-gold">{block.heading}</h2>
          )}
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {block.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="mb-8 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <Link to={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
