import clsx from "clsx"
import "./styles.scss"
import { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Button = ({
  className = "",
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "btn",
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
