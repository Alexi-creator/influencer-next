import { ReactNode } from "react"
import clsx from "clsx"

import "./styles.scss"

interface RadioProps {
  name: string
  value: string
  disabled?: boolean
  defaultChecked?: boolean
  className?: string
  children: ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio = ({
  name = "",
  value = "",
  disabled = false,
  defaultChecked = false,
  className = "",
  children,
  onChange,
  ...props
}: RadioProps) => {

  return (
    <label
      className={clsx("radio", className)}
    >
      <input
        name={name}
        value={value}
        type="radio"
        disabled={disabled}
        defaultChecked={defaultChecked}
        onChange={onChange}
        {...props}
      />
      <span className="radio__content">
        <span className="radio__custom"></span>
        {children}
      </span>
    </label>
  )
}
