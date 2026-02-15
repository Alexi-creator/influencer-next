import clsx from "clsx"
import { useState } from "react"

import { RatingIcon } from "@/icons/RatingIcon"

import "./styles.scss"

interface RatingProps {
  name?: string
  initialRate?: number
  interactive?: boolean
  className?: string
}

const starValues = [1, 2, 3, 4, 5]

export const Rating = ({ name, initialRate = 0, interactive = false, className = "", ...props }: RatingProps) => {
  const isInteractive = interactive || !!name
  const [rate, setRate] = useState<number>(initialRate)
  const [hoverRate, setHoverRate] = useState<number | null>(null)

  const displayRate = hoverRate ?? rate

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!isInteractive) return

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
    if (!isInteractive) return

    setHoverRate(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!isInteractive) return

    const target = event.target as HTMLElement
    const svgElem = target.closest(".rating__icon") as HTMLElement | null

    if (svgElem) {
      const dataRate = Number(svgElem.dataset.rate)

      if (dataRate) {
        setRate(dataRate)
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!isInteractive) return

    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      setRate((prev) => Math.min(prev + 1, 5))
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      setRate((prev) => Math.max(prev - 1, 0))
    }
  }

  const interactiveProps = isInteractive
    ? {
        role: "slider" as const,
        "aria-label": "Rating",
        "aria-valuemin": 0,
        "aria-valuemax": 5,
        "aria-valuenow": rate,
        tabIndex: 0,
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
      }
    : {}

  return (
    <div
      className={clsx("rating", { "rating--select": isInteractive }, className)}
      data-rating={displayRate}
      {...interactiveProps}
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
