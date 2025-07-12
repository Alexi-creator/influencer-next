import clsx from "clsx"
import "./styles.scss"
import Image from "next/image"

interface GalleryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  cards: string[]
}

export const GalleryCard = ({
  className = "",
  cards,
  ...props
}: GalleryCardProps) => {
  return (
    <div className={`gallery-card ${clsx(className)}`} {...props}>
      {cards.slice(0, -1).map((src) => {
        return (
          <div key={src} className="gallery-card__item">
            <Image src={src} width={36} height={36} alt="Gallery item" />
          </div>
        )
      })}
      <div className="gallery-card__item">
        <Image src={cards.at(-1)!} alt="Gallery item" width={36} height={36} />
        <span className="gallery-card__item-more">+{cards.length - 2}</span>
      </div>
    </div>
  )
}
