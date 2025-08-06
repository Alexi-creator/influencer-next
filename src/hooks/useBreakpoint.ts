import { useEffect, useState } from "react"

import { BreakpointWidth, BreakpointName, BreakpointWidthToName } from "@/types/breakpointTypes"

const breakpoints = [
  BreakpointWidth.MOBILE,
  BreakpointWidth.TABLET,
  BreakpointWidth.DESKTOP,
  BreakpointWidth.FULLHD,
]

type breakpointType = {
  getCurrentWidth: () => void
  currentBreakpoint: BreakpointName | undefined
}

/**
 * Хук, который возвращает
 *
 */
export const useBreakpoint = () => {
  const [state, setState] = useState<breakpointType>({
    getCurrentWidth: () => window.innerWidth,
    currentBreakpoint: undefined,
  })

  const getCurrentBreakpoint = () => {
    const currentWidth = window.innerWidth
    let currentBreakpoint = BreakpointName.MOBILE

    if (currentWidth > BreakpointWidth.FULLHD) {
      currentBreakpoint = BreakpointName.FULLHD

      return currentBreakpoint
    }

    for(let i = 0; i < breakpoints.length; i += 1) {
      if (currentWidth >= breakpoints[i] && currentWidth < breakpoints[i+1]) {
        currentBreakpoint = BreakpointWidthToName[breakpoints[i]]

        break
      }
    }

    return currentBreakpoint
  }

  useEffect(() => {
    const setBreakpoint = () => {
      const currentBreakpoint = getCurrentBreakpoint()
      setState(prev => ({ ...prev, currentBreakpoint }))
    }

    setBreakpoint()

    const mediaQueries = breakpoints.map((bp) =>
      window.matchMedia(`(min-width: ${bp}px)`)
    )

    mediaQueries.forEach((mq) =>
      mq.addEventListener("change", setBreakpoint)
    )

    return () => {
      mediaQueries.forEach((mq) =>
        mq.removeEventListener("change", setBreakpoint)
      )
    }
  }, [])

  return state
}
