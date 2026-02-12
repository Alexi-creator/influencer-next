import type { TextareaHTMLAttributes } from "react"
import "./styles.scss"

export const Textarea = ({
  name,
  className = "",
  placeholder = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className="textarea">
      <textarea
        name={name}
        className={`textarea__input ${className}`}
        placeholder={placeholder}
        data-id={`parent-${name}`}
        {...props}
      ></textarea>
      <p className="textarea__error" data-id={`error-${name}`}></p>
    </div>
  )
}
