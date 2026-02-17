"use client"

import clsx from "clsx"
import Image from "next/image"
import { Share } from "@/components/Share"
import { Button } from "@/components/ui/Button"

import { ArrowUp } from "@/icons/ArrowUp"

import { scrollTo } from "@/utils/scrollTo"

import "./styles.scss"

export interface EntityToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  imgHref?: string
}

export const EntityToolbar = ({ className, name, imgHref }: EntityToolbarProps) => {
  return (
    <div className={clsx("entity-toolbar", className, {})}>
      <Button className="entity-toolbar__btn-top btn--none" onClick={() => scrollTo()}>
        <ArrowUp />
      </Button>

      <div className="entity-toolbar__brand">
        <div className="entity-toolbar__brand-logo">
          {imgHref && <Image src={imgHref} width={48} height={48} alt="brand" />}
        </div>
        <div className="entity-toolbar__brand-name">{name}</div>
      </div>

      <div className="entity-toolbar__subscribe">
        <Button className="btn--text entity-toolbar__subscribe-btn">Подписаться</Button>

        <span className="entity-toolbar__subscribe-dote" />

        <Share />
      </div>
    </div>
  )
}
