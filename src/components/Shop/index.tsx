"use client"

import Image from "next/image"

import { ShopTypes } from "@/app/api/shops/route"

import { Badge } from "@/components/ui/Badge"
import { Breadcrumbs } from "@/components/ui/Breadcrumbs"
import { Button } from "@/components/ui/Button"
import { Share } from "@/components/Share"
import { ShopCard } from "@/components/ShopCard"

import { RoundIcon } from "@/icons/RoundIcon"

import "./styles.scss"

export const Shop = ({
  previewImgHref,
  goodsImgHref,
  title,
  benefits,
  about,
  categories,
  shops,
}: ShopTypes) => {
  return (
    <div className="shops">
      <div className="shops__preview">
        <div className="shops__preview-inner">

          {/* Images section */}
          <div className="shops__preview-images">
            <div className="shops__preview-images-wrapper">
              <Image
                className="shops__preview-images-main"
                src={previewImgHref}
                alt="shop-preview"
                // loading="lazy"
                width={300}
                height={200}
              />

              <div className="shops__preview-images-list">
                {goodsImgHref.map(src => (
                  <Image
                    key={src}
                    className="shops__preview-images-small"
                    src={src}
                    alt="shop-goods"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Description section */}
          <div className="shops__preview-description">
            <div className="shops__preview-description-title">
              {title}
            </div>

            <div className="shops__preview-description-badges">
              {benefits.map((benefit) => (
                <Badge key={benefit} className="badge--small">{benefit}</Badge>
              ))}
            </div>

            <div className="shops__preview-description-about">
              {about}
            </div>

            <div className="shops__preview-description-breadcrumbs">
              <Breadcrumbs
                title="Категории:"
                items={categories}
              />
            </div>

            <div className="shops__preview-description-share">
              <Button className="btn--color-primary-light">
                Подписаться
              </Button>

              <RoundIcon className="shop-card__sub-round" />

              <Share />
            </div>
          </div>
        </div>
      </div>

      <div className="shops__list shop-card-list">
        {shops.map(shopData => (
          <ShopCard key={shopData.id} {...shopData} />
        ))}
      </div>
    </div>
  )
}
