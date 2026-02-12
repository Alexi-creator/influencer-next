"use client"

import clsx from "clsx"
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules"
import type { SwiperProps as VendorSwiperProps } from "swiper/react"
import { SwiperSlide, Swiper as VendorSwiper } from "swiper/react"

import { ArrowIcon } from "@/icons/ArrowIcon"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

import "./styles.scss"

interface SwiperProps extends VendorSwiperProps {
  className?: string
  slideClassName?: string
  slides: React.ReactNode[]
  showNavigation?: boolean
  showPagination?: boolean
}

export const Swiper = ({
  className,
  slideClassName,
  slides,
  showNavigation = true,
  showPagination = false,
  ...props
}: SwiperProps) => {
  return (
    <VendorSwiper
      className={clsx(className)}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      navigation={
        showNavigation
          ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
          : undefined
      }
      pagination={showPagination ? { clickable: true } : false}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      {...props}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={clsx(slideClassName)}>
          {slide}
        </SwiperSlide>
      ))}

      {showNavigation && (
        <>
          <div className="swiper-button-prev">
            <ArrowIcon />
          </div>
          <div className="swiper-button-next">
            <ArrowIcon />
          </div>
        </>
      )}
    </VendorSwiper>
  )
}
