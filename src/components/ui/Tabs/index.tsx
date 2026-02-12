"use client"

import clsx from "clsx"
import Link from "next/link"
import { type ReactNode, useState } from "react"

import { Swiper } from "@/components/ui/Swiper"

import { useBreakpoint } from "@/hooks/useBreakpoint"

import { BREAKPOINT_NAME, type BreakpointName } from "@/types/breakpointTypes"

import "./styles.scss"

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  initialActiveTab?: string
  tabListClassName?: string
  title?: string
  titleClassName?: string
  isLinks?: boolean
  hasSwiper?: boolean
  initialSlide?: number
  swiperBreakpoints?: BreakpointName[]
  tabs: {
    name: string
    link?: string
    tabClassName?: string
    label: string | ReactNode
    count?: number
    content?: string | ReactNode
  }[]
}

export const Tabs = ({
  className = "",
  title,
  titleClassName,
  tabListClassName = "",
  initialActiveTab,
  tabs,
  isLinks,
  hasSwiper,
  initialSlide,
  swiperBreakpoints = [BREAKPOINT_NAME.MOBILE],
  ...props
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    initialActiveTab ? initialActiveTab : tabs[0].name,
  )

  const { currentBreakpoint } = useBreakpoint()
  const isActiveSwiper = currentBreakpoint && swiperBreakpoints.includes(currentBreakpoint)

  const preparedTabs = tabs.map((tab) => {
    if (tab.link) {
      return (
        <Link
          key={tab.name}
          className={clsx("tabs__tab", tab.tabClassName, {
            "tabs__tab--active": tab.name === activeTab,
          })}
          href={tab.link}
        >
          {tab.label}
          {tab.count && <span className="tabs__tab-count">{tab.count}</span>}
        </Link>
      )
    }

    return (
      <button
        key={tab.name}
        className={clsx("tabs__tab", tab.tabClassName, {
          "tabs__tab--active": tab.name === activeTab,
        })}
        onClick={() => setActiveTab(tab.name)}
      >
        {tab.label}
        {tab.count && <span className="tabs__tab-count">{tab.count}</span>}
      </button>
    )
  })

  return (
    <div className={clsx("tabs", className)} {...props}>
      {title && <div className={clsx("tabs__title", titleClassName)}>{title}</div>}

      <div className="tabs__head">
        {hasSwiper && isActiveSwiper ? (
          <Swiper
            className={clsx(tabListClassName)}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={0}
            initialSlide={initialSlide}
            breakpoints={{
              420: {
                slidesPerView: 1.5,
              },
            }}
            slides={preparedTabs}
          />
        ) : (
          <div className={clsx("tabs__list", tabListClassName)}>{preparedTabs}</div>
        )}
      </div>

      {!isLinks && (
        <div className="tabs__contents">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              className={clsx("tabs__content", {
                "tabs__content--active": tab.name === activeTab,
              })}
            >
              {tab.content}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
