import clsx from "clsx"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/Button"

import "./styles.scss"

interface WithProductProps {
  className?: string
  title: string
  btnHeaderText: string
  btnLoadText: string
  btnId?: string
  children: ReactNode
}

export const WithProduct = ({
  className,
  title,
  btnHeaderText,
  btnLoadText,
  btnId,
  children,
}: WithProductProps) => {
  return (
    <div className={clsx("with-product", className)}>
      <div className="with-product__inner">
        <div className="with-product__title">{title}</div>
        <Button className="with-product__action-btn">{btnHeaderText}</Button>
        <div className="with-product__content">{children}</div>
        <div className="with-product__load-btn">
          <Button id={btnId} className="btn--dashed">
            {btnLoadText}
          </Button>
        </div>
      </div>
    </div>
  )
}
