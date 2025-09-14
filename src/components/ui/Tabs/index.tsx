"use client"

import { ReactNode, useState } from "react"
import clsx from "clsx"

import "./styles.scss"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  initialActiveTab?: string
  tabListClassName?: string
  tabs: {
    path: string
    tabClassName?: string
    label: string | ReactNode
    count?: number
    content: string | ReactNode
  }[]
}

export const Tabs = ({
  className = "",
  tabListClassName = "",
  initialActiveTab,
  tabs,
  ...props
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    initialActiveTab ? initialActiveTab : tabs[0].path
  )

  return (
    <div className={clsx("tabs", className)} {...props}>
      <div className="tabs__head">
        <div className={clsx("tabs__list", tabListClassName)}>
          {tabs.map((tab) => (
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
          ))}
        </div>
      </div>

      <div className="tabs__contents">
        {tabs.map((tab) => (
          <div
            key={tab.path}
            className={clsx("tabs__content", {
              "tabs__content--active": tab.path === activeTab,
            })}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
