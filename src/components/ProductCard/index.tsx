"use client"

import clsx from "clsx"
import Image from "next/image"
import { memo } from "react"

import type { ProductCardTypes } from "@/app/api/shop/[id]/goods/route"

import { CameraIcon } from "@/icons/CameraIcon"
import { FavoriteIcon } from "@/icons/FavoriteIcon"

import "./styles.scss"

export const ProductCard = memo(
  ({
    className,
    title,
    discount,
    sale,
    hasLike,
    sizes,
    applicationStatus,
    href,
    brand,
    firstImageSrc,
    secondImageSrc,
    date,
    status,
  }: ProductCardTypes) => {
    const Tag = href ? "a" : "div"

    return (
      <Tag className={clsx("product-card", className)} {...(href ? { href } : {})}>
        <div className="product-card__img">
          <div className="product-card__img-wrapper">
            <div className="product-card__img-first">
              <Image src={firstImageSrc} alt="product" width={322} height={483} />
            </div>
            <div className="product-card__img-second">
              <Image src={secondImageSrc} alt="product2" width={322} height={483} />
            </div>
          </div>

          {hasLike && (
            <div className="product-card__like">
              <FavoriteIcon />
            </div>
          )}

          {applicationStatus && (
            <div className="product-card__application-status">{applicationStatus}</div>
          )}
        </div>

        <div className="product-card__descr">
          <div className="product-card__info">
            <div className="product-card__info-wrap">
              <div className="badge">
                <span className="badge__sub">до</span> -50%
              </div>
              <div className="badge">
                <CameraIcon />
              </div>
              <div className="badge">СП</div>
              <div className="badge">TFF</div>
            </div>
          </div>

          <div className="product-card__descr-top">
            {brand && <div className="product-card__brand">{brand}</div>}
            <div className="product-card__title">{title}</div>

            <div className="product-card__sizes">
              Размеры:
              <ul className="product-card__sizes-variants">
                {sizes.map((size) => (
                  <li key={size}>{size}</li>
                ))}
              </ul>
              <span className="product-card__sizes-more">еще 13</span>
            </div>

            <div className="product-card__date">
              <span className="product-card__date-text">До завершения:</span>
              <span className="product-card__date-number">{date}</span>
            </div>

            <div className="product-card__likes">
              <FavoriteIcon />
              89
            </div>
          </div>

          <div className="product-card__descr-bottom">
            <div className="product-card__status">Статус: {status}</div>
            <div className={clsx("product-card__price", discount)}>
              <div className="product-card__price-current">27 966 ₽</div>
              {sale && <div className="product-card__price-sale">{sale}</div>}
            </div>
          </div>
        </div>
      </Tag>
    )
  },
)
