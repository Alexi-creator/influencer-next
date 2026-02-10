import clsx from "clsx"
import type { ReactNode } from "react"

import "./styles.scss"

interface SectionProps {
  className?: string
  noInner?: boolean
  children?: ReactNode
}

export const Section = ({ className, children, noInner = false }: SectionProps) => {
  return (
    <section className={clsx("section", className)}>
      {noInner ? children : <div className="section__inner">{children}</div>}
    </section>
  )
}
