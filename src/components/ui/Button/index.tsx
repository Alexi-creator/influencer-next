import clsx from "clsx"
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react"

import "./styles.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", disabled = false, children, ...props }, ref) => {
    return (
      <button ref={ref} className={clsx("btn", className)} disabled={disabled} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"
