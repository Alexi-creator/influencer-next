import { useState, ReactNode, ElementType } from "react"
import clsx from "clsx"

import RevealIcon from "../../../icons/reveal.svg"
import CollapseIcon from "../../../icons/collapse.svg"

import "./styles.scss"

interface CollapseProps {
  title?: string
  className?: string
  initialOpen?: boolean
  CustomIcon?: ElementType
  children: ReactNode
}

export const Collapse = ({
  title = "",
  className = "",
  initialOpen = true,
  CustomIcon,
  children,
  ...props
}: CollapseProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen)

  const toggleCollapse = () => {
    setIsOpen(prev => !prev)
  }

  const HeaderIcon =  isOpen ? RevealIcon : CollapseIcon

  return (
    <div
      className={clsx("collapse", className, {
        "collapse--close": !isOpen,
      })}
      {...props}
    >
      <div className="collapse__head" onClick={toggleCollapse}>
        <span className="collapse__head-title">{title}</span>
        {CustomIcon && <CustomIcon className="collapse__head-icon" /> || <HeaderIcon className="collapse__head-icon" />}
      </div>

      <div className="collapse__content">
        {children}
      </div>
    </div>
  )
}
