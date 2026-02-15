"use client"

import clsx from "clsx"
import Image from "next/image"
import { Share } from "@/components/Share"
import { Button } from "@/components/ui/Button"

import { ArrowUp } from "@/icons/ArrowUp"

import { useShop } from "@/providers/ShopProvider/ index"

import { scrollTo } from "@/utils/scrollTo"

import "./styles.scss"

export interface BrandToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string
  imgHref?: string
}

export const BrandToolbar = ({ className, brandName, imgHref }: BrandToolbarProps) => {
  const shopData = useShop()

  const { title, image } = shopData

  return (
    <div className={clsx("brand-toolbar", className, {})}>
      <Button className="brand-toolbar__btn-top btn--none" onClick={() => scrollTo()}>
        <ArrowUp />
      </Button>

      <div className="brand-toolbar__brand">
        <div className="brand-toolbar__brand-logo">
          {(image || imgHref) && (
            <Image src={image || (imgHref as string)} width={48} height={48} alt="brand" />
          )}
        </div>
        <div className="brand-toolbar__brand-name">{title || brandName}</div>
      </div>

      <div className="brand-toolbar__subscribe">
        <Button className="btn--text brand-toolbar__subscribe-btn">Подписаться</Button>

        <span className="brand-toolbar__subscribe-dote" />

        <Share />
      </div>
    </div>
  )
}
