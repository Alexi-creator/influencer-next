import { ReactNode } from "react"
import clsx from "clsx"
import "./styles.scss"

interface CounterProps {
  color: string
  className?: string
  children: ReactNode
}

export const Counter = ({
  color = "",
  className = "",
  children,
  ...props
}: CounterProps) => {

  return (
    <div
      className={clsx("counter", `counter--${color}`, className)}
      {...props}
    >
      {children}
    </div>
  )
}
