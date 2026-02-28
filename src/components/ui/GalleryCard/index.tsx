import clsx from "clsx"
import Image from "next/image"

import "./styles.scss"

interface GalleryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  cards: string[]
}

export const GalleryCard = ({ className = "", cards, ...props }: GalleryCardProps) => {
  return (
    <div className={`gallery-card ${clsx(className)}`} {...props}>
      {cards.slice(0, -1).map((src, index) => {
        return (
          <div key={src + index} className="gallery-card__item">
            <Image src={src} width={36} height={36} alt="Gallery item" />
          </div>
        )
      })}
      <div className="gallery-card__item">
        <Image src={cards[cards.length - 1]} alt="Gallery item" width={36} height={36} />
        {cards.length >= 3 && <span className="gallery-card__item-more">+{cards.length - 2}</span>}
      </div>
    </div>
  )
}
