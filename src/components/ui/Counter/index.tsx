import clsx from "clsx"
import type { ReactNode } from "react"
import "./styles.scss"

interface CounterProps extends React.HTMLAttributes<HTMLDivElement> {
  color: string
  className?: string
  children: ReactNode
}

export const Counter = ({ color = "", className = "", children, ...props }: CounterProps) => {
  return (
    <div className={clsx("counter", `counter--${color}`, className)} {...props}>
      {children}
    </div>
  )
}
