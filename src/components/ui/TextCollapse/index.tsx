"use client"

import clsx from "clsx"
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowIcon } from "@/icons/ArrowIcon"
import "./styles.scss"

interface TextCollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  maxLines?: number
}

export const TextCollapse = ({ children, maxLines = 3, className }: TextCollapseProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const [collapsedHeight, setCollapsedHeight] = useState<number | undefined>(undefined)
  const contentRef = useRef<HTMLDivElement>(null)

  const measure = useCallback(() => {
    const el = contentRef.current
    if (!el) return

    const target = el.firstElementChild ?? el
    const lineHeight = parseFloat(getComputedStyle(target).lineHeight) || 20
    const maxHeight = lineHeight * maxLines

    setCollapsedHeight(maxHeight)
    setIsClamped(el.scrollHeight > Math.ceil(maxHeight))
  }, [maxLines])

  useEffect(() => {
    measure()

    const el = contentRef.current
    if (!el) return

    const observer = new ResizeObserver(measure)
    observer.observe(el)

    return () => observer.disconnect()
  }, [measure])

  return (
    <div className={clsx("text-collapse", className)}>
      <div
        ref={contentRef}
        className="text-collapse__content"
        style={
          !isOpen && isClamped && collapsedHeight
            ? { maxHeight: collapsedHeight, overflow: "hidden" }
            : undefined
        }
      >
        {children}
      </div>

      {isClamped && (
        <Button
          className="text-collapse__btn btn--text btn--none btn--color-grey"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{isOpen ? "Свернуть" : "Развернуть"}</span>
          <ArrowIcon
            className={clsx("text-collapse__icon", {
              "text-collapse__icon--expand": isOpen,
            })}
          />
        </Button>
      )}
    </div>
  )
}
