import clsx from "clsx"

import "./styles.scss"

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  isUncontrolled?: boolean
  onCheckedChange?: (name: string, value: string, event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio = ({
  name = "",
  value = "",
  disabled = false,
  checked = false,
  defaultChecked = false,
  isUncontrolled = false,
  className = "",
  children,
  onCheckedChange,
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
        {...(isUncontrolled ? { defaultChecked } : { checked })}
        onChange={(e) => onCheckedChange?.(name, value, e)}
        {...props}
      />
      <span className="radio__content">
        <span className="radio__custom"></span>
        {children}
      </span>
    </label>
  )
}
