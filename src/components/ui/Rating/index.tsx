import clsx from "clsx"
import { useState } from "react"

import { RatingIcon } from "@/icons/RatingIcon"

import "./styles.scss"

interface RatingProps {
  name?: string
  initialRate?: 0 | 1 | 2 | 3 | 4 | 5
  className?: string
}

const starValues = [1, 2, 3, 4, 5]

export const Rating = ({ name, initialRate = 0, className = "", ...props }: RatingProps) => {
  const [rate, setRate] = useState<number>(initialRate)
  const [hoverRate, setHoverRate] = useState<number | null>(null)

  const displayRate = hoverRate ?? rate

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!name) return

    const target = event.target as HTMLElement
    const svgElem = target.closest(".rating__icon") as HTMLElement | null

    if (svgElem) {
      const dataRate = Number(svgElem.dataset.rate)

      if (dataRate) {
        setHoverRate(dataRate)
      }
    }
  }

  const handleMouseOut = (): void => {
    if (!name) return

    setHoverRate(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!name) return

    const target = event.target as HTMLElement
    const svgElem = target.closest(".rating__icon") as HTMLElement | null

    if (svgElem) {
      const dataRate = Number(svgElem.dataset.rate)

      if (dataRate) {
        setRate(dataRate)
      }
    }
  }

  return (
    <div
      className={clsx("rating", className)}
      data-rating={displayRate}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}
      {...props}
    >
      {starValues.map((star) => (
        <RatingIcon
          key={star}
          className={clsx("rating__icon", {
            active: star <= displayRate,
          })}
          data-rate={star}
        />
      ))}

      {name && <input type="text" name={name} value={rate} onChange={() => {}} hidden />}
    </div>
  )
}
