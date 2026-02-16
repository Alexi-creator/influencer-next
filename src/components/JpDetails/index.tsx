"use client"

import clsx from "clsx"
import Image from "next/image"

import { BtnShow } from "@/components/BtnShow"
import { Share } from "@/components/Share"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Progress } from "@/components/ui/Progress"
import type { JpDetailsTypes } from "@/types/jpDetails.schema"

import "./styles.scss"

type JpStatus = "progress" | "done" | "cancel"

interface JpDetailsProps {
  data: JpDetailsTypes
  extraClass?: string
}

const statusBadgeClass: Record<JpStatus, string> = {
  progress: "badge--color-primary-light",
  done: "badge--color-green",
  cancel: "badge--color-grey",
}

const statusProgressClass: Record<JpStatus, string> = {
  progress: "progress--primary",
  done: "progress--green",
  cancel: "progress--grey",
}

export const JpDetails = ({ data, extraClass }: JpDetailsProps) => {
  const {
    title,
    status,
    discountSize,
    discountSum,
    oldSum,
    allSum,
    isActiveSP,
    activityDateDay,
    activityDateTime,
    shop,
    author,
    spDateCreation,
    describeSp,
  } = data

  return (
    <div className={clsx("jp-details", extraClass)}>
      <div className="jp-details__wrapper">
        <div className="jp-details__header">
          <div className="jp-details__header-title">
            <div className="jp-details__header-title-txt">
              <h1 className="jp-details__header-title-txt-about">Совместная покупка</h1>
              <div className="jp-details__header-title-txt-phrase">{title}</div>
            </div>
            <div className="jp-details__header-title-subscribe">
              <Share />
              <Button className="btn--color-primary-light">Подписаться на СП</Button>
            </div>
          </div>

          {status && (
            <div
              className={clsx(
                "jp-details__header-conditions",
                `jp-details__header-conditions--${status}`,
              )}
            >
              <div className="jp-details__header-conditions-discount">
                <div className="jp-details__header-conditions-discount-badge">
                  <Badge
                    className={clsx(
                      "badge--font-commissioner badge--without-border badge--big",
                      statusBadgeClass[status],
                    )}
                  >
                    Скидка -{discountSize}%
                  </Badge>
                </div>
                <div className="jp-details__header-conditions-discount-sum">
                  при покупке от{" "}
                  <span className="jp-details__header-conditions-discount-sum-number">
                    {discountSum} &#8381;
                  </span>
                </div>
              </div>

              <div className="jp-details__header-conditions-progress">
                <div className="jp-details__header-conditions-progress-sum">
                  <span className="jp-details__header-conditions-progress-sum-title">
                    Уже купили на:
                  </span>
                  <span className="number">{oldSum}</span>
                  <span> /</span>
                  <span className="number">{allSum}</span>
                  <span className="currency">&#8381;</span>
                </div>
                <div className="jp-details__header-conditions-progress-range">
                  <Progress className={statusProgressClass[status]} width={isActiveSP} />
                </div>
              </div>

              <div className="jp-details__header-conditions-activity">
                <div className="jp-details__header-conditions-activity-title jp-details__header-conditions-activity-title--time">
                  Активна до:
                </div>
                <div className="jp-details__header-conditions-activity-title jp-details__header-conditions-activity-title--jp">
                  Совм. Покупка:
                </div>
                <time className="jp-details__header-conditions-activity-date">
                  {activityDateDay} {activityDateTime}
                </time>
                <div className="jp-details__header-conditions-activity-status jp-details__header-conditions-activity-status--done">
                  Состоялась
                </div>
                <div className="jp-details__header-conditions-activity-status jp-details__header-conditions-activity-status--cancel">
                  Не состоялась
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="jp-details__source">
          <div className="jp-details__source-shop">
            <div className="jp-details__source-shop-title">Магазин</div>
            <div className="jp-details__source-shop-inner">
              <div className="jp-details__source-shop-inner-content">
                <div className="jp-details__source-shop-img">
                  <Image src={shop.image} alt={shop.name} width={40} height={40} />
                </div>
                <div className="jp-details__source-shop-name">{shop.name}</div>
              </div>
              <Button className="btn--none">Подписаться</Button>
            </div>
          </div>
          <div className="jp-details__source-author">
            <div className="jp-details__source-author-title">Автор и дата создания</div>
            <div className="jp-details__source-author-inner">
              <div className="jp-details__source-author-inner-content">
                <div className="jp-details__source-author-img">
                  <Image src={author.image} alt={author.name} width={40} height={40} />
                </div>
                <div className="jp-details__source-author-name">
                  <span className="jp-details__source-author-name-txt">{author.name}</span>
                  <p>
                    <span className="number">{author.subscribersNumber}</span> подписчиков
                  </p>
                </div>
              </div>
              <div className="jp-details__source-author-sp-date">
                <p>СП создана</p>
                <span>{spDateCreation}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="jp-details__description">
          <div className="jp-details__description-title">Описание Совместной Покупки</div>
          <div className="jp-details__description-inner">
            <BtnShow visibleRowCount={3}>
              <p className="jp-details__description-text">{describeSp}</p>
            </BtnShow>
          </div>
        </div>

        <div className="jp-details__controls">
          <Button className="jp-details__controls-btn-create-jp">
            <span className="jp-details__controls-btn-create-jp-mobile">
              Создать Совместную Покупку
            </span>
            <span className="jp-details__controls-btn-create-jp-desktop">Создать СП</span>
          </Button>
          <Button className="btn--text btn--none btn--color-grey">Создать публикацию</Button>
        </div>
      </div>
    </div>
  )
}
