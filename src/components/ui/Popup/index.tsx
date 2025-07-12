import clsx from "clsx"

import CrossIcon from "../../../icons/cross.svg"

import "./styles.scss"
import { Button } from "../Button"

interface PopupProps {
  title?: string
  className?: string
  titleClassName?: string
  isCloseIcon?: boolean
  media?: string
  isOpen?: boolean
  children: React.ReactNode
  onClose: () => void
}

export const Popup = ({
  title = "",
  className = "",
  titleClassName = "",
  isCloseIcon = true,
  isOpen = false,
  media,
  children,
  onClose,
  ...props
}: PopupProps) => {
  const handleClose = () => {
    onClose()
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={clsx("popup", className, {
        "popup--open": isOpen,
      })}
      data-media={media}
      {...props}
    >
      <div className="popup__overlay" onClick={handleOverlayClick}>
        <div className="popup__content">
          {title && (
            <div
              className={clsx("popup__title", titleClassName)}
            >
              {title}
            </div>
          )}

          {isCloseIcon && title && (
            <Button
              className={clsx("popup__btn-close", "btn--color-primary-light")}
              onClick={handleClose}
            >
              <CrossIcon />
            </Button>
          )}

          {children}
        </div>
      </div>
    </div>
  )
}
