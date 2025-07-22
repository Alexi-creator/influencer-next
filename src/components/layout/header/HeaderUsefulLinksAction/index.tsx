"use client"

import { useState } from "react"
import Link from "next/link"
import clsx from "clsx"

import ArrowIcon from "@/icons/arrow.svg"
import CrossIcon from "@/icons/cross.svg"
import MoreIcon from "@/icons/more.svg"

import "./styles.scss"

interface HeaderUsefulLinksActionProps {
  links: { href: string; text: string }[]
}

export const HeaderUsefulLinksAction = ({  links }: HeaderUsefulLinksActionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <MoreIcon onClick={() => setIsOpen(true)} />

      <div className={clsx("useful-links", {
        "active": isOpen,
      })}>
        <div className="useful-links__title">
          Полезные ссылки
          <CrossIcon onClick={() => setIsOpen(false)} />
        </div>

        <ul className="useful-links__list">
          {links.map(link => (
            <li key={link.text} className="useful-links__list-item">
              <Link href={link.href}>
                {link.text}
                <ArrowIcon />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
