import clsx from "clsx"

import { Swiper as VendorSwiper, SwiperSlide } from "swiper/react"
import type { SwiperProps as VendorSwiperProps } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"

import ArrowIcon from "../../../icons/arrow.svg"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

import "./styles.scss"

interface SwiperProps extends VendorSwiperProps {
  slides: React.ReactNode[]
  showNavigation?: boolean
  showPagination?: boolean
}

export const Swiper = ({
  slides,
  showNavigation = true,
  showPagination = false,
  ...props
}: SwiperProps) => {
  return (
    <VendorSwiper
      className={clsx()}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      navigation={showNavigation ? {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      } : undefined}
      pagination={showPagination ? { clickable: true } : false}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      {...props}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
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
