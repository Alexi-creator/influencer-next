"use client"

import clsx from "clsx"

import { Button } from "@/components/ui/Button"

import { CrossIcon } from "@/icons/CrossIcon"

import "./styles.scss"

interface ActionsProps {
  title: string
  className?: string
  type: "sort" | "filter"
  isOpen: boolean
  hasSelected: boolean
  selectedFiltersCount?: number
  icon: React.ReactNode
  handleClick: () => void
}

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  isSticky?: boolean
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  configActions?: ActionsProps[]
}

export const Toolbar = ({
  isSticky = true,
  leftSlot,
  rightSlot,
  configActions = [],
  className,
}: ToolbarProps) => {
  return (
    <div className={clsx("toolbar", className, {
      "toolbar--sticky": isSticky,
    })}>
      <div className="toolbar__left">
        {leftSlot}
      </div>
      <div className="toolbar__right">
        {rightSlot}

        <div className="toolbar__actions">
          {configActions.map(action => {
            return (
              <Button
                key={action.title}
                className={clsx("toolbar__actions-btn", "btn--outlined", "btn--color-grey", action.className, {
                  "toolbar__actions-btn--open" : action.isOpen,
                  "btn--tag, btn--tag-checked, toolbar__actions-btn--selected" : action.hasSelected,
                })}
                onClick={action.handleClick}
              >
                <span className="toolbar__actions-btn-title">
                  {action.title}
                  {Boolean(action.selectedFiltersCount) && " "}
                  {/* {Boolean(action.selectedFiltersCount) && !action.isOpen && action.selectedFiltersCount} */}
                </span>

                {Boolean(action.selectedFiltersCount) && !action.isOpen && action.selectedFiltersCount && (
                  <span className="toolbar__actions-btn-count">
                    {action.selectedFiltersCount}
                  </span>
                )}

                {/* {action.isOpen ? <CrossIcon /> : !action.selectedFiltersCount && action.icon} */}
                {action.isOpen ? <CrossIcon /> : action.icon}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
