"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"

import clsx from "clsx"

import "./styles.scss"

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  initialActiveTab?: string
  tabListClassName?: string
  title?: string
  titleClassName?: string
  isLinks?: boolean
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
  ...props
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    initialActiveTab ? initialActiveTab : tabs[0].name
  )

  return (
    <div className={clsx("tabs", className)} {...props}>
      {title && <div className={clsx("tabs__title", titleClassName)}>{title}</div>}

      <div className="tabs__head">
        <div className={clsx("tabs__list", tabListClassName)}>
          {tabs.map((tab) => {
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
          })}
          {/* {tabs.map((tab) => (
            <button
              key={tab.path}
              className={clsx("tabs__tab", tab.tabClassName, {
                "tabs__tab--active": tab.path === activeTab,
              })}
              onClick={() => setActiveTab(tab.path)}
            >
              {tab.label}
              {tab.count && <span className="tabs__tab-count">{tab.count}</span>}
            </button>
          ))} */}
        </div>
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
