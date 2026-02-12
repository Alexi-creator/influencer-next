"use client"

import TooltipRc from "rc-tooltip"
import { type ReactElement, useEffect, useState } from "react"
import "rc-tooltip/assets/bootstrap.css"

import "./styles.scss"

interface TooltipProps {
  content: string | ReactElement
  placement?: "top" | "bottom" | "left" | "right"
  showArrow?: boolean
  children: ReactElement
}

export const Tooltip = ({
  content,
  placement = "top",
  showArrow = false,
  children,
}: TooltipProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return children // пока не загрузился клиент, ничего не показываем иначе ошибка
  }

  return (
    <TooltipRc placement={placement} overlay={content} showArrow={showArrow}>
      {children}
    </TooltipRc>
  )
}
