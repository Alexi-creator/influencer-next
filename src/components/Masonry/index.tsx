"use client"

import React, { ReactNode, useMemo } from "react"
import clsx from "clsx"

import { BreakpointName } from "@/types/breakpointTypes"
import { useBreakpoint } from "@/hooks/useBreakpoint"

import "./styles.scss"

interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameColumn?: string
  breakpointsSettings: Partial<Record<BreakpointName, number>>
  children: ReactNode[]
};

export const Masonry = ({
  className,
  classNameColumn,
  breakpointsSettings,
  children,
} : MasonryProps) => {
  const { currentBreakpoint } = useBreakpoint()

  let columns: number | undefined

  if (currentBreakpoint) {
    columns = breakpointsSettings[currentBreakpoint] || Object.values(breakpointsSettings).at(-1)
  }

  const columnWrappers = useMemo(() => {
    if (!columns) return undefined

    const cols: ReactNode[][] = Array.from({ length: columns }, () => [])
    children.forEach((child, index) => {
      cols[index % columns].push(child)
    })

    return cols
  }, [children, columns])

  if (!columnWrappers) return null

  return (
    <div className={clsx("masonry", className)} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {columnWrappers.map((col, idx) => (
        <div key={idx} className={clsx("masonry__column", classNameColumn)}>
          {col}
        </div>
      ))}
    </div>
  )
}
