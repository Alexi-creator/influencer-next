"use client"

import { useContext } from "react"

import clsx from "clsx"

import { GlobalModalContext } from "@/providers/GlobalModalProvider"

import { CrossIcon } from "@/icons/CrossIcon"
import { ShareLinkIcon } from "@/icons/ShareLinkIcon"

import { CopyIcon } from "@/icons/CopyIcon"
import { TelegramIcon } from "@/icons/TelegramIcon"
import { FacebookIcon } from "@/icons/FacebookIcon"
import { TwitterIcon } from "@/icons/TwitterIcon"
import { WhatsappIcon } from "@/icons/WhatsappIcon"

import "./styles.scss"

interface ShareProps {
  link?: string
}

const icons = [CopyIcon, TelegramIcon, FacebookIcon, TwitterIcon, WhatsappIcon]

export const Share = ({ link }: ShareProps) => {
  console.log("link", link)

  const globalModalContext = useContext(GlobalModalContext)
  const { setConfigModal } = globalModalContext

  const handleClose = () => {
    setConfigModal(prev => ({
      ...prev,
      isOpen: false,
    }))
  }

  const handleOpen = () => {
    setConfigModal(prev => ({
      ...prev,
      isOpen: true,
      onClose: handleClose,
      content: (
        <div className={clsx("share", "share--open")}>
          <div className="share__block">
            <div className="share__block-head">
              Поделиться
              <div className="share__close popup__close" onClick={handleClose}>
                <CrossIcon />
              </div>
            </div>

            <ul className="share__list">
              {icons.map((Icon, idx) => (
                <li key={idx}>
                  <Icon className="share__item-icon" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    }))
  }

  return (
    <ShareLinkIcon className="share__open" onClick={handleOpen} />
  )
}
