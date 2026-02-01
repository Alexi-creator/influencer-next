"use client"

import { useState } from "react"
import { CartCard } from "@/components/CartCard"
import { Checkbox } from "@/components/ui/Checkbox"
import { Progress } from "@/components/ui/Progress"
import type { CartTypes } from "@/types/carts"

import "./styles.scss"

interface CartProps extends CartTypes {
  index: number
}

const STATUS_COLOR_MAP = {
  active: "primary",
  happened: "green",
  "not-happened": "grey",
}

export const Cart = ({
  index,
  id: _id,
  isSp,
  title,
  soldSum,
  allSum,
  spStatus,
  progress,
  date,
  time,
  storeName,
  storeLogoHref: _storeLogoHref,
  canCreateSp,
  canUpdateStore,
  goods,
}: CartProps) => {
  const [goodsCount, _setGoodsCount] = useState(goods?.reduce((acc, item) => acc + item.amount, 0) ?? 0)

  const progressColor = STATUS_COLOR_MAP[spStatus] ?? "primary"
  const isChooseAllActive = goods.length > 0 && goods.some((good) => good.isDisabled === false)

  return (
    <div className="cart">
      <div className="cart__top">
        <div className="cart__top-inner">
          <div className="cart__top-title">
            Корзина #{index + 1} {isSp && "(СП)"}
          </div>

          <div className="cart__top-content">
            {isSp && (
              <div className="cart__top-wrapper">
                <div className="cart__top-content-title">Совместная покупка</div>
                <div className="cart__top-content-feature">
                  <div className="cart__top-content-catch-phrase">{title}</div>

                  <div className="cart__top-content-feature-inner">
                    <div className="cart__top-content-feature-purchases">
                      <div>
                        <span>Уже купили на: </span>
                        <span className="number">{soldSum}</span>
                        <span> / </span>
                        <span className="number">{allSum}</span>
                        <span className="currency">&nbsp;₽</span>
                      </div>

                      <Progress color={progressColor} width={progress} />
                    </div>

                    <div>
                      {spStatus === "active" && (
                        <>
                          <div>Активна до:</div>
                          <div className="cart__top-content-event">
                            {date} {time}
                          </div>
                        </>
                      )}

                      {spStatus === "happened" && (
                        <>
                          <div>Совм. Покупка:</div>
                          <div className="cart__top-content-event cart__top-content-event--is-happened">Состоялась</div>
                        </>
                      )}

                      {spStatus === "not-happened" && (
                        <>
                          <div>Совм. Покупка:</div>
                          <div className="cart__top-content-event cart__top-content-event--is-not-happened">Не состоялась</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="cart__top-wrapper">
              <div className="cart__top-content-title">Магазин</div>
              <div className="cart__top-seller-inner">
                <div className="cart__top-seller-inner-content">
                  <div className="cart__top-seller-img">
                    <img src="images/shop-avatar.png" alt="Shop avatar" />
                  </div>
                  <div className="cart__top-seller-name">{storeName}</div>
                </div>
                <button className="btn btn--color-primary-light btn--none cart__top-seller-btn">Подписаться</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cart__control">
        <div className="cart__control-top">
          <div className="cart__control-top-type">Товары</div>
          <div className="cart__control-top-choose-all">
            <Checkbox
              name="allCheckbox"
              value="all-1"
              // mod="checkbox--radius-medium"
              // classes="cart__control__top-choose-all-txt"
              disabled={!isChooseAllActive}
            >
              Выбрать все
            </Checkbox>
          </div>
        </div>
      </div>

      <div className="cart__items">
        {goods.map((item) => (
          <CartCard key={item.id} {...item} />
        ))}
      </div>

      <div className="cart__control">
        <div className="cart__control-bottom">
          <div className="cart__control-bottom-results">
            <div className="cart__control-bottom-results-total">Итого</div>

            <div className="cart__control-bottom-results-group">
              <div className="cart__control-bottom-results-group-position">{goods.length} позиции</div>
              <div className="cart__control-bottom-results-group-amount">
                <span className="cart__control-bottom-results-group-amount-number">{goodsCount}</span> шт. товаров
              </div>
              <div className="cart__control-bottom-results-group-sum">
                <span className="cart__control-bottom-results-group-sum-old">0 ₽</span>
                <span className="cart__control-bottom-results-group-sum-new">0 ₽</span>
              </div>
            </div>
          </div>

          <div className="cart__control-bottom-control">
            {canCreateSp && (
              <div className="cart__control-bottom-control-up">
                <button className="btn btn--color-primary-light">Создать новую SP</button>
              </div>
            )}

            {canUpdateStore && (
              <div className="cart__control-bottom-control-up">
                <button className="btn btn--color-primary-light">Обновить скидку</button>
                <svg>
                  <use xlinkHref="./img/icons/icons.svg#info" />
                </svg>
              </div>
            )}

            <div className="cart__control-bottom-control-order">
              <button className="cart__control-bottom-control-btn-del btn btn--none btn--text btn--color-grey">Удалить эту корзину</button>
              <button className="cart__control-bottom-control-btn-order btn" disabled>
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
