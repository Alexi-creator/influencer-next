import clsx from "clsx"
import { forwardRef, type TextareaHTMLAttributes } from "react"
import "./styles.scss"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, className = "", placeholder = "", errorText = "", ...props }, ref) => {
    return (
      <div className="textarea">
        <textarea
          ref={ref}
          name={name}
          className={clsx("textarea__input", className, { error: !!errorText })}
          placeholder={placeholder}
          {...props}
        />
        <p className="textarea__error">{errorText}</p>
      </div>
    )
  },
)

Textarea.displayName = "Textarea"
