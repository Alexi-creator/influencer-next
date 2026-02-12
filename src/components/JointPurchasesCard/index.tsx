"use client"

import clsx from "clsx"
import Image from "next/image"
import { memo } from "react"
import { Share } from "@/components/Share"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/Progress"
import { Swiper } from "@/components/ui/Swiper"

import { BREAKPOINT_WIDTH } from "@/types/breakpointTypes"

import "./styles.scss"

interface slideTypes {
  img1: string
  img2: string
  title: string
  priceOld: string
  priceNew: string
}

export interface JointPurchasesCardTypes {
  id: number
  shopBrandImgHref: string
  title: string
  shareLink: string
  progress: string
  status: "processing" | "ready" | "disabled"
  categories: string
  slides: slideTypes[]
}

export const JointPurchasesCard = memo(({ shopBrandImgHref, title, shareLink, categories, progress, status, slides }: JointPurchasesCardTypes) => {
  return (
    <div
      className={clsx("joint-purchases-card", {
        "joint-purchases-card--processing": status === "processing",
        "joint-purchases-card--ready": status === "ready",
        "joint-purchases-card--disabled": status === "disabled",
      })}
    >
      <div className="joint-purchases-card__about">
        <div className="joint-purchases-card__logo">
          <Image src={shopBrandImgHref} alt="sp" width={32} height={32} />
        </div>
        <div className="joint-purchases-card__title">{title}</div>
        <div className="joint-purchases-card__subscribe">
          Подписаться
          <span className="joint-purchases-card__subscribe-delimiter"></span>
          <Share link={shareLink} />
        </div>
        <div className="joint-purchases-card__categories">
          {/* Категории: Платья и сарафаны, Юбки, Летние платья и еще 23 */}
          Категории: {categories}
        </div>
      </div>

      <div className="joint-purchases-card__slider">
        <Swiper
          className="swiper-joint-purchases"
          slidesPerView={2}
          centeredSlides={false}
          spaceBetween={12}
          breakpoints={{
            [BREAKPOINT_WIDTH.TABLET]: {
              slidesPerView: 3.5,
            },
            [BREAKPOINT_WIDTH.DESKTOP]: {
              slidesPerView: 2.5,
            },
            [BREAKPOINT_WIDTH.FULLHD]: {
              slidesPerView: 4.5,
            },
          }}
          slides={slides.map((slide) => (
            <div key={slide.title} className="joint-purchases-card__slide">
              <Image src={slide.img1} alt="sp-slide-1" width={202} height={290} />

              <Image src={slide.img2} alt="sp-slide-1" width={202} height={290} />

              <div className="joint-purchases-card__slide-info">
                <div className="joint-purchases-card__slide-info-title">{slide.title}</div>
                <div className="joint-purchases-card__slide-info-price">
                  <div className="joint-purchases-card__slide-info-price-old">{slide.priceOld}</div>
                  <div className="joint-purchases-card__slide-info-price-new">{slide.priceNew}</div>
                </div>
              </div>
            </div>
          ))}
        />
      </div>

      <div className="joint-purchases-card__info">
        <div className="joint-purchases-card__discount">
          <div className="joint-purchases-card__discount-amount">
            <Badge className="badge--big badge--without-border badge--font-commissioner">Скидка -30%</Badge>
          </div>
          <div className="joint-purchases-card__discount-from">
            при покупке <span>от 136 000 &#8381;</span>
          </div>
        </div>

        <div className="joint-purchases-card__already">
          <div className="joint-purchases-card__already-title">Уже купили на:</div>
          <div className="joint-purchases-card__already-count">
            <span>79 281</span>
            <span>/</span>
            <span>241 093</span>
            <span>&#8381;</span>
          </div>
        </div>

        <div className="joint-purchases-card__progress">
          <Progress width={progress} />
        </div>

        <div className="joint-purchases-card__hr hr"></div>

        <div className="joint-purchases-card__until">
          Активна до: <div className="joint-purchases-card__until-date">27.01.2020 12:00</div>
        </div>

        <div className="joint-purchases-card__status">
          <div className="joint-purchases-card__status-title">Совм. Покупка:</div>
          <div className="joint-purchases-card__status-text">
            {status === "ready" && "Состоялась"}
            {status === "disabled" && "Не состоялась"}
          </div>
        </div>
      </div>

      <div className="joint-purchases-card__brand">
        <div className="joint-purchases-card__brand-logo">
          <Image src={shopBrandImgHref} alt="sp-brand" width={32} height={32} />
        </div>
        <div className="joint-purchases-card__brand-title">Интернет магазин одежды и аксессуаров Lass</div>
      </div>
    </div>
  )
})
