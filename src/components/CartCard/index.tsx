"use client"

import clsx from "clsx"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"
import { Tooltip } from "@/components/ui/Tooltip"
import { InfoIcon } from "@/icons/InfoIcon"
import { MinusIcon } from "@/icons/MinusIcon"
import { PlusIcon } from "@/icons/PlusIcon"
import type { GoodsTypes } from "@/types/carts"

import "./styles.scss"

export interface CartCardProps extends GoodsTypes {}

export const CartCard = ({
  id: _id,
  imgHref,
  brand,
  description,
  isDisabled,
  isSp,
  isSelected,
  amount,
  size,
  discountPercent,
  oldSum,
  newSum,
  pricingByQuantity,
}: CartCardProps) => {
  return (
    <div
      className={clsx("cart-item", {
        "cart-item--disabled": isDisabled,
      })}
    >
      <div className="cart-item__wrapper">
        {/* === Product Card === */}
        <div className="cart-item__product-card">
          <div className="cart-item__product-card-pic">
            <Image src={imgHref} alt={brand} width={70} height={100} />
          </div>

          <div className="cart-item__product-card-description">
            <div className="cart-item__product-card-description-title">{brand}</div>
            <div className="cart-item__product-card-description-txt">{description}</div>
          </div>
        </div>

        {/* === Control (Размер / Кол-во) === */}
        <div className="cart-item__control">
          <div
            className={clsx("cart-item__control-size", {
              "cart-item--disabled-size": isDisabled,
            })}
          >
            {size}
          </div>

          <div className="cart-item__control-amount">
            <Button className="btn--none" disabled={isDisabled}>
              <MinusIcon />
            </Button>

            <input
              className="cart-item__control-amount-input"
              name="control-items"
              type="text"
              value={`${amount} шт.`}
              disabled={isDisabled}
              readOnly
            />

            <Button className="btn--none" disabled={isDisabled}>
              <PlusIcon />
            </Button>
          </div>
        </div>

        {/* === Discount === */}
        <div
          className={clsx("cart-item__discount", {
            "cart-item__discount--sp": isSp,
            "cart-item__discount--store": !isSp,
          })}
        >
          <div className="cart-item__discount-upper">
            <div className="cart-item__discount-upper-title">
              {isSp ? (
                <>
                  <span className="cart-item__discount-upper-title-sp--mobile">Скидка:</span>
                  <span className="cart-item__discount-upper-title-sp--md">Ваша скидка:</span>
                  <span className="cart-item__discount-upper-title-sp--lg">Скидка в СП:</span>
                </>
              ) : (
                <>
                  <span className="cart-item__discount-upper-title-store--md">Ваша скидка:</span>
                  <span className="cart-item__discount-upper-title-store--mobile">Скидка:</span>
                </>
              )}
            </div>

            <div className="cart-item__discount-upper-size">
              <div className="badge badge--discount-cart">-{discountPercent}%</div>
            </div>
          </div>
        </div>

        {/* === Navigate choose === */}
        <div
          className={clsx("cart-item__navigate-choose", {
            "cart-item__navigate-choose--store": !isSp,
          })}
        >
          {isDisabled ? (
            <>
              <Tooltip
                content={
                  <>
                    Товара выбранного вами размера не осталось в наличии. Вы можете удалить его из
                    корзины или
                    <a href="#" className="cart-item__tooltip btn btn--primary btn--none">
                      Выбрать другой размер
                    </a>
                  </>
                }
              >
                <InfoIcon />
              </Tooltip>

              <span>Товар недоступен</span>
            </>
          ) : (
            <Checkbox
              // name="checkbox"
              // value="all"
              // text="Выбрать"
              // mod="checkbox--radius-medium"
              checked={isSelected}
              className="cart-control__top-choose-all-txt"
            >
              Выбрать
            </Checkbox>
          )}
        </div>

        {/* === Navigate price === */}
        <div
          className={clsx("cart-item__navigate-price", {
            "cart-item__navigate-price--store": !isSp,
          })}
        >
          <span className="cart-item__navigate-price-old-sum">{Number(oldSum) * amount} ₽</span>
          <span className="cart-item__navigate-price-new-sum">{Number(newSum) * amount} ₽</span>
        </div>

        {/* === Delete button === */}
        <div
          className={clsx("cart-item__delete", {
            "cart-item__delete--store": !isSp,
          })}
        >
          <Button className="btn--text btn--color-grey btn--none">Удалить</Button>
        </div>

        {/* === Discount details (только для store) === */}
        {!isSp && (
          <div className="cart-item__discount-details">
            <div className="cart-item__discount-store">
              {Object.entries(pricingByQuantity || {}).map(([key, value], index) => (
                <span key={index}>
                  {key} шт. {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
