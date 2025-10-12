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
 * React-хук для определения текущего брейкпоинта экрана.
 *
 * Хук отслеживает ширину окна браузера и вычисляет соответствующий брейкпоинт
 * на основе заранее определённых значений (`BreakpointWidth`).
 *
 * Возвращает объект с:
 * - `getCurrentWidth`: функция, возвращающая текущую ширину окна браузера.
 * - `currentBreakpoint`: название текущего брейкпоинта (например, `"mobile"`, `"tablet"`, `"desktop"`, `"fullhd"`).
 *
 * Пример:
 * ```tsx
 * const { currentBreakpoint, getCurrentWidth } = useBreakpoint()
 *
 * console.log(currentBreakpoint) // 'tablet'
 * console.log(getCurrentWidth()) // 1024
 * ```
 *
 * @returns {{
 *   getCurrentWidth: () => number;
 *   currentBreakpoint: import("@/types/breakpointTypes").BreakpointName | undefined;
 * }} Объект с текущим брейкпоинтом и функцией для получения ширины окна.
 *
 * @see BreakpointWidth — перечисление доступных ширин брейкпоинтов.
 * @see BreakpointName — перечисление имён брейкпоинтов.
 * @see BreakpointWidthToName — соответствие между шириной и названием брейкпоинта.
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
