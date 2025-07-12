import { useRef, useState } from "react"
import clsx from "clsx"

import { useEventListener } from "@/app/hooks/useEventListener"

import "./styles.scss"

interface TickerProps {
  text: string
  className?: string
}

export const Ticker = ({
  text,
  className = "",
  ...props
}: TickerProps) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const tickerWrapperRef = useRef<HTMLDivElement>(null)
  const tickerTextRef = useRef<HTMLDivElement>(null)

  const handleMouseOver = () => {
    const containerLength = tickerWrapperRef?.current?.clientWidth
    const textLength = tickerTextRef?.current?.clientWidth || 0

    if ((containerLength && textLength) && textLength > containerLength) {
      setIsActive(true)
    }
  }

  const handleMouseOut = () => {
    setIsActive(false)
  }

  useEventListener("mouseover", handleMouseOver, tickerWrapperRef)
  useEventListener("mouseout", handleMouseOut, tickerWrapperRef)

  return (
    <div className={`ticker ${clsx(className, {
      "active": isActive,
    })}`} {...props} ref={tickerWrapperRef}>
      <div className="ticker__text" ref={tickerTextRef}>
        {text}
      </div>
    </div>
  )
}
