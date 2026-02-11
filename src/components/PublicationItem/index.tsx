import clsx from "clsx"
import Image from "next/image"
import { memo } from "react"
import "./styles.scss"

interface PublicationItemProps {
  className?: string
  img: string
  title: string
  price: string
  currency: string
  descr?: string
}

export const PublicationItem = memo(({
  className,
  img,
  title,
  price,
  currency,
  descr,
}: PublicationItemProps) => {
  return (
    <div className={clsx("publication-item", className)}>
      <div className="publication-item__img">
        <Image src={img} alt="publication-item" width={80} height={80} />
      </div>
      <div className="publication-item__content">
        <div className="publication-item__title">{title}</div>
        <div className="publication-item__price">
          <span className="publication-item__price-number number">{price}</span>
          <span className="publication-item__price-currency">{currency}</span>
        </div>
        {descr && <div className="publication-item__descr">{descr}</div>}
      </div>
    </div>
  )
})
