"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"
import { ChooseCity } from "@/components/ChooseCity"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Rating } from "@/components/ui/Rating"
import { Select } from "@/components/ui/Select"
import { CreditCardIcon } from "@/icons/CreditCardIcon"
import { HeartIcon } from "@/icons/HeartIcon"
import { LikesIcon } from "@/icons/LikesIcon"
import { MinusIcon } from "@/icons/MinusIcon"
import { PlusIcon } from "@/icons/PlusIcon"
import { TruckIcon } from "@/icons/TruckIcon"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"
import type { ProductTypes } from "@/types/product.schema"

import "./styles.scss"

interface ProductPropsTypes extends ProductTypes {
  className?: string
}

export const Product = ({
  className,
  images = [],
  point,
  deliveryPrice,
  productDescription,
  productName,
  productShortDescription,
  rating,
  likesScore,
  postScore,
  postLink,
  sizeOptions = [],
  amountOptions = [],
  priceCrossed,
  priceNew,
  discountScore,
  sellerName,
  imgSeller,
  isDiscount,
  discountExtra,
  discountExtraSum,
  spDiscountLinksFound,
  productDetails = [],
  priceByAmount = {},
}: ProductPropsTypes) => {
  const { setConfigModal } = useContext(GlobalModalContext)

  const [cartCount, setCartCount] = useState(0)
  const [selectedAmount, setSelectedAmount] = useState("1")

  const isInCart = cartCount > 0
  const currentPrice = priceByAmount[selectedAmount] ?? priceNew

  const getSizeOptionsWithStock = (options: typeof sizeOptions) =>
    options.map((option) => ({
      ...option,
      additionalLabel:
        option.stock < 4 ? `осталось ${option.stock} штук` : `в наличии ${option.stock} штук`,
      ...(option.stock < 4 && { color: "red" as const }),
    }))

  const enrichedSizeOptions = getSizeOptionsWithStock(sizeOptions)

  const handleAddToCart = () => {
    setCartCount(Number(selectedAmount))
  }

  const handleIncrement = () => {
    setCartCount((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setCartCount((prev) => (prev > 1 ? prev - 1 : 0))
  }

  return (
    <div className={clsx("product", className)}>
      <div className="product__wrapper">
        <div className="product__inner">
          <div className="product__img-container">
            {images.map((img, index) => (
              <div key={index} className={`product__grid-img product__item${index + 1}`}>
                <Image src={img} alt={img} width={600} height={600} />
              </div>
            ))}
          </div>
        </div>

        <div className="product__delivery-description">
          <div className="product__delivery-inner">
            <div className="product__title">Доставка и оплата</div>
            <div className="product__delivery-point">
              <span className="product__delivery-point-city">{point}</span>
              <Button
                className="btn--none product__delivery-btn"
                onClick={() => {
                  setConfigModal((prev) => ({
                    ...prev,
                    isOpen: true,
                    title: "",
                    className: "",
                    content: <ChooseCity setConfigModal={setConfigModal} />,
                  }))
                }}
              >
                Изменить
              </Button>
            </div>
            <div className="product__delivery-content">
              <div className="product__delivery-content-item">
                <div className="product__delivery-content-icon">
                  <TruckIcon />
                </div>
                <div className="product__delivery-content-description">
                  <div className="product__delivery-description-point">
                    Курьером / наличные, только Москва
                  </div>
                  <div className="product__delivery-description-point">от 2 до 7 дней</div>
                  <div className="product__delivery-description-price">{deliveryPrice} ₽</div>
                </div>
              </div>
              <div className="product__delivery-content-item">
                <div className="product__delivery-content-icon">
                  <CreditCardIcon />
                </div>
                <div className="product__delivery-content-description">
                  <div className="product__delivery-description-point">
                    Транспортной компанией (ТК) / в другие города и страны
                  </div>
                  <div className="product__delivery-description-point">от 7 до 21 дня</div>
                  <div className="product__delivery-description-price">
                    Стоимость будет рассчитана после выбора ТК
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product__description-inner">
            <div className="product__title">Описание товара</div>
            <div className="product__description-content">{productDescription}</div>
          </div>
        </div>

        <div className="product__inner-description">
          <div className="product__short-description">
            <div className="product__short-description-title">{productName}</div>
            <div className="product__short-description-description">{productShortDescription}</div>
            <div className="product__short-description-score">
              <div className="product__short-description-score-stars-inner">
                <Rating initialRate={rating} />
                <div className="product__short-description-score-likes">
                  <LikesIcon />
                  <span>{likesScore}</span>
                </div>
              </div>
              <div className="product__short-description-score-posts">
                <Link href={postLink}>{postScore} публикаций</Link>
                <span>с этим товаром</span>
              </div>
            </div>
          </div>

          <div className="product__short-description-discount">
            <div className="product__short-description-choice-title">
              Стоимость с Вашей скидкой:
            </div>
            <div className="product__info-price">
              <div className="product__info-price-inner">
                <span className="product__info-price-item-crossed">
                  <span className="product__info-price-item-crossed number">{priceCrossed}</span>
                  {" ₽"}
                </span>
                <span className="product__info-price-item-new">
                  <Badge className="badge--without-border badge--discount">
                    - {discountScore} %
                  </Badge>
                  <span className="product__info-price-item-new number">{priceNew}</span>
                  {" ₽"}
                </span>
              </div>
            </div>
          </div>

          <div className="product__short-description-size-inner">
            <div className="product__short-description-size">
              <div className="product__short-description-choice-title">Выберите размер:</div>
              <div className="product__short-description-choice-wrapper-size">
                <div className="product__short-description-choice-select">
                  <Select
                    className="select--border-grey"
                    name="size"
                    options={enrichedSizeOptions}
                    initialValue={sizeOptions[0]?.value}
                    initialLabel={sizeOptions[0]?.label}
                  />
                </div>
                <Link href="#">Таблица размеров</Link>
              </div>
            </div>
            <div className="product__short-description-size">
              <div className="product__short-description-choice-title-amount">
                Выберите количество:
              </div>
              <div className="product__short-description-choice-wrapper">
                <div className="product__short-description-choice-select">
                  <Select
                    className="select--border-grey"
                    name="amount"
                    options={amountOptions}
                    initialValue={amountOptions[0]?.value}
                    initialLabel={amountOptions[0]?.label}
                    onValueChange={setSelectedAmount}
                  />
                </div>
                {selectedAmount === "1" ? (
                  <span className="product__short-description-choice-number product__viseable--one">
                    <span>1 товар</span> со скидкой -10%
                  </span>
                ) : (
                  <span className="product__short-description-choice-number product__viseable--more">
                    Какие скидки на товар?
                    <Button className="btn--none">Узнать</Button>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="product__short-description-sp">
            <div className="product__short-description-sp-title">Совместная покупка:</div>
            <div className="product__short-description-sp-content">
              Покупаем пока есть скидка, девочки
            </div>
          </div>

          <div className="product__short-description-sales">
            <div className="product__short-description-sales-price">
              <span className="product__short-description-sales-price-txt">Вы заплатите</span>
              <span className="product__info-price-item-new">
                <span className="product__info-price-item-new product__info-price-item-new-count number">
                  {currentPrice}
                </span>
                {" ₽"}
              </span>
              <span className="product__short-description-sales-price-txt">за 1 шт. товара</span>
            </div>
            <div className="product__short-description-sales-price-actions">
              {!isInCart && (
                <Button className="product__short-description-sales-add" onClick={handleAddToCart}>
                  Добавить в корзину
                </Button>
              )}
              {isInCart && (
                <>
                  <Link href="#" className="product__short-description-sales-cart btn btn--green">
                    В корзине <span>перейти</span>
                  </Link>
                  <div className="product__short-description-sales-change-count">
                    <button
                      type="button"
                      className="product__short-description-sales-increment btn btn--color-primary-light"
                      onClick={handleIncrement}
                    >
                      <PlusIcon />
                    </button>
                    <div className="product__short-description-sales-count-wrap">
                      <span className="product__short-description-sales-count">{cartCount}</span>
                      {" шт."}
                    </div>
                    <button
                      type="button"
                      className="product__short-description-sales-decrement btn btn--color-primary-light"
                      onClick={handleDecrement}
                    >
                      <MinusIcon />
                    </button>
                  </div>
                </>
              )}
              {!isInCart && (
                <Link
                  href="#"
                  className="product__short-description-sales-buy btn btn--color-primary-light"
                >
                  Купить сейчас
                </Link>
              )}
              <button
                type="button"
                className="product__short-description-sales-actions btn btn--color-primary-light"
              >
                <HeartIcon />
              </button>
            </div>
            <div className="product__short-description-sales-price-create-post">
              <Link href="#">Создать публикацию с этим товаром</Link>
              <p>
                Совместная покупка &quot;Покупаем пока есть скидка, девочки&quot; активна до
                06.09.21. Если до этого времени сумма покупок в &quot;Название&quot; достигнет 990
                000 руб., мы подтвердим Ваш заказ и произведем списание заблокированных средств с
                указанной Вами банковской карты.
              </p>
            </div>
          </div>

          {isDiscount && (
            <div className="product__short-description-sp-discount">
              <div className="product__short-description-sp-discount-title">Больше скидка:</div>
              <div className="product__short-description-sp-discount-inner">
                <div className="product__short-description-sp-discount-content">
                  <Badge className="badge--without-border badge--discount">
                    - {discountExtra} %
                  </Badge>
                  <div className="product__short-description-sp-discount-sum">
                    <span className="number">{discountExtraSum}</span> ₽
                  </div>
                </div>
                <div className="product__short-description-sp-discount-links">
                  <span>в {spDiscountLinksFound} Совместных Покупках</span>
                  <Link href="#">Перейти</Link>
                </div>
              </div>
            </div>
          )}

          <div className="product__short-description-shop">
            <div className="product__title-shop">Магазин</div>
            <div className="product__seller-inner">
              <div className="product__seller-inner-content">
                <div className="product__seller-img">
                  <Image src={imgSeller} alt={sellerName} width={40} height={40} />
                </div>
                <div className="product__seller-name">{sellerName}</div>
              </div>
              <button type="button" className="btn btn--none product__seller-btn">
                Подписаться
              </button>
            </div>
          </div>

          <div className="product__description-shop">
            <div className="product__title">О товаре</div>
            <ul className="product__short-description-shop-product">
              {productDetails.map((detail, index) => (
                <li key={index}>
                  <span className="product__table-dot" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link href="#" className="product__footer-link">
        Перейти к полной версии карточки товара
      </Link>
    </div>
  )
}
