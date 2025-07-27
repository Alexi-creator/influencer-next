"use client"

import { useEffect } from "react"
import clsx from "clsx"

import { Button } from "@/components/ui/Button"

import { ModalProps } from "@/types/modalTypes"

import { CrossIcon } from "@/icons/CrossIcon"


import "./styles.scss"

export const Modal = ({
  isOpen = false,
  title = "",
  titleClassName = "",
  iconCloseClassName = "",
  isCloseIcon = true,
  className = "",
  media,
  children,
  onClose,
}: ModalProps) => {


  const handleClose = () => {
    onClose?.()
  }

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow")
    } else {
      document.body.classList.remove("overflow")
    }

    return () => {
      document.body.classList.remove("overflow")
    }
  }, [isOpen])

  return (
    <div
      className={clsx("modal", className, {
        "modal--open": isOpen,
      })}
      data-media={media}
    >
      <div className="modal__overlay" onClick={handleOverlayClick}>
        <div className="modal__content">
          {title && (
            <div
              className={clsx("modal__title", titleClassName)}
            >
              {title}
            </div>
          )}

          {isCloseIcon && title && (
            <Button
              className={clsx("modal__btn-close", "btn--color-primary-light", iconCloseClassName)}
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
