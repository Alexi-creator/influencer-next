import { useState } from "react"
import clsx from "clsx"

import "./styles.scss"

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  initialActiveTab?: string
  tabs: {
    path: string
    label: string
    count?: number
    content: string
  }[]
}

export const Tabs = ({
  className = "",
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
        <div className="tabs__list">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              className={clsx("tabs__tab", {
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
