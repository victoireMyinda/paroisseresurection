interface BannerHeadingTitleProps {
  title: string
  titleLine2?: string
  className?: string
}

/** Titre de bannière sur une ou deux lignes (ligne 2 en accent doré). */
export function BannerHeadingTitle({ title, titleLine2, className }: BannerHeadingTitleProps) {
  if (titleLine2) {
    return (
      <h1 className={className}>
        {title}
        <br />
        <span className="gold-gradient">{titleLine2}</span>
      </h1>
    )
  }

  return <h1 className={className}>{title}</h1>
}
