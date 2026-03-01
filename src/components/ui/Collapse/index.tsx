"use client"

import clsx from "clsx"
import { type ReactElement, type ReactNode, useState } from "react"
import { CollapseIcon } from "@/icons/CollapseIcon"
import { RevealIcon } from "@/icons/RevealIcon"

import "./styles.scss"

interface CollapseProps {
  title?: string | ReactNode
  className?: string
  initialOpen?: boolean
  CustomIcon?: ReactElement
  hideIcon?: boolean
  onOpenChange?: (isOpen: boolean) => void
  //  renderCustomIcon?: (props?: { className?: string }) => ReactNode
  children: ReactNode
}

export const Collapse = ({
  title = "",
  className = "",
  initialOpen = true,
  hideIcon = false,
  CustomIcon,
  onOpenChange,
  // renderCustomIcon,
  children,
  ...props
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen)

  const HeaderIcon = isOpen ? CollapseIcon : RevealIcon

  const Icon = !hideIcon && (CustomIcon || <HeaderIcon />)

  return (
    <div
      className={clsx("collapse", className, {
        "collapse--close": !isOpen,
        "collapse--open": isOpen,
      })}
      {...props}
    >
      <div
        className="collapse__head"
        onClick={() => {
          const next = !isOpen
          setIsOpen(next)
          onOpenChange?.(next)
        }}
      >
        <span className="collapse__head-title">{title}</span>
        <div className="collapse__head-icon">
          {/* {CustomIcon || <HeaderIcon />} */}
          {Icon}
        </div>
      </div>

      <div className="collapse__content">{children}</div>
    </div>
  )
}
