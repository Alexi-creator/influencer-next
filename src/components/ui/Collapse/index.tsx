"use client"

import { useState, ReactNode, ReactElement } from "react"
import clsx from "clsx"

import { RevealIcon } from "@/icons/RevealIcon"
import { CollapseIcon } from "@/icons/CollapseIcon"

import "./styles.scss"

interface CollapseProps {
  title?: string | ReactNode
  className?: string
  initialOpen?: boolean
  CustomIcon?: ReactElement
  //  renderCustomIcon?: (props?: { className?: string }) => ReactNode
  children: ReactNode
}

export const Collapse = ({
  title = "",
  className = "",
  initialOpen = true,
  CustomIcon,
  // renderCustomIcon,
  children,
  ...props
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen)

  const toggleCollapse = () => {
    setIsOpen(prev => !prev)
  }

  const HeaderIcon = isOpen ? RevealIcon : CollapseIcon

  return (
    <div
      className={clsx("collapse", className, {
        "collapse--close": !isOpen,
        "collapse--open": isOpen,
      })}
      {...props}
    >
      <div className="collapse__head" onClick={toggleCollapse}>
        <span className="collapse__head-title">{title}</span>
        <div className="collapse__head-icon">
          {CustomIcon || <HeaderIcon />}
        </div>
      </div>

      <div className="collapse__content">
        {children}
      </div>
    </div>
  )
}
