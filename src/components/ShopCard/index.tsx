"use client"

import clsx from "clsx"
import Image from "next/image"

import type { ShopsTypes } from "@/app/api/shops/route"
import { Share } from "@/components/Share"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Button } from "@/components/ui/Button"
import { RoundIcon } from "@/icons/RoundIcon"
import { Badge } from "../ui/Badge"

import "./styles.scss"

export const ShopCard = ({ logoImgHref, name, itemImages, benefits, categories, isSubscribed }: ShopsTypes) => {
  return (
    <div className="shop-card">
      <div className="shop-card__inner">
        <div className="shop-card__top">
          <div className="shop-card__title-inner">
            <div className="shop-card__title-img">
              <Image src={logoImgHref} alt={name} width={48} height={48} />
            </div>

            <div className="shop-card__title-txt">
              <h2 className="shop-card__title-name">{name}</h2>

              <div className="shop-card__title-features">
                {benefits.map((benefit) => (
                  <Badge key={benefit}>{benefit}</Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="shop-card__catalog-img">
            {itemImages.map((src, index) => (
              <Image key={index} src={src} alt="shop-item" width={60} height={90} />
            ))}
          </div>

          <div className="shop-card__desc">
            <Breadcrumbs title="Категории:" items={categories} />
          </div>
        </div>

        <div className="shop-card__sub">
          <Button
            className={clsx({
              "btn--color-primary-light": !isSubscribed,
              "btn--color-green": isSubscribed,
            })}
          >
            {isSubscribed ? "Подписаться" : "Вы подписаны"}
          </Button>

          <RoundIcon className="shop-card__sub-round" />

          <Share />
        </div>
      </div>
    </div>
  )
}
