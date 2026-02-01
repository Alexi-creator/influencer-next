"use client"

import clsx from "clsx"
import type { RefObject } from "react"

import { Button } from "@/components/ui/Button"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import { CrossIcon } from "@/icons/CrossIcon"
import type { BreakpointName } from "@/types/breakpointTypes"
import { scrollTo } from "@/utils/scrollTo"

import "./styles.scss"

interface ActionsProps {
  title: string
  className?: string
  type: "sort" | "filter" | "category" | "visibleMode"
  isOpen?: boolean
  hasSelected?: boolean
  selectedFiltersCount?: number
  icon: React.ReactNode
  breakpointVisible?: BreakpointName[]
  handleClick: () => void
}

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  isSticky?: boolean
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  configActions?: ActionsProps[]
  isToolbarAtTop?: boolean
  sentinelRef?: RefObject<HTMLDivElement | null>
}

export const Toolbar = ({ isSticky = true, leftSlot, rightSlot, configActions = [], isToolbarAtTop, sentinelRef, className }: ToolbarProps) => {
  const { currentBreakpoint } = useBreakpoint()

  const visibleButtons = configActions.filter(({ breakpointVisible }) => {
    if (!breakpointVisible) return true
    if (currentBreakpoint && breakpointVisible.includes(currentBreakpoint)) return true

    return false
  })

  return (
    <div
      className={clsx("toolbar", className, {
        "toolbar--sticky": isSticky,
      })}
    >
      <div className="toolbar__left">{leftSlot}</div>
      <div className="toolbar__right">
        {rightSlot}

        <div className="toolbar__actions">
          {visibleButtons.map((action) => {
            return (
              <Button
                key={action.title}
                className={clsx("toolbar__actions-btn", "btn--outlined", "btn--color-grey", action.className, {
                  "toolbar__actions-btn--open": action.isOpen,
                  "btn--tag, btn--tag-checked, toolbar__actions-btn--selected": action.hasSelected,
                  "visible-mode-btn": action.type === "visibleMode",
                })}
                onClick={() => {
                  action.handleClick()

                  if (isToolbarAtTop) scrollTo(sentinelRef?.current, 150)
                }}
              >
                {Boolean(action.title) && (
                  <span className={clsx("toolbar__actions-btn-title")}>
                    {action.title}
                    {Boolean(action.selectedFiltersCount) && " "}
                  </span>
                )}

                {Boolean(action.selectedFiltersCount) && !action.isOpen && action.selectedFiltersCount && (
                  <span className="toolbar__actions-btn-count">{action.selectedFiltersCount}</span>
                )}

                {action.isOpen ? <CrossIcon /> : action.icon}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
