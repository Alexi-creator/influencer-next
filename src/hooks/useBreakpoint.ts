import { useEffect, useState } from "react"

import {
  BREAKPOINT_NAME,
  BREAKPOINT_WIDTH,
  type BreakpointName,
  BreakpointWidthToName,
} from "@/types/breakpointTypes"

const breakpoints = [
  BREAKPOINT_WIDTH.MOBILE,
  BREAKPOINT_WIDTH.TABLET,
  BREAKPOINT_WIDTH.DESKTOP,
  BREAKPOINT_WIDTH.FULLHD,
]

const getCurrentBreakpoint = () => {
  const currentWidth = window.innerWidth
  let currentBreakpoint: BreakpointName = BREAKPOINT_NAME.MOBILE

  if (currentWidth > BREAKPOINT_WIDTH.FULLHD) {
    return BREAKPOINT_NAME.FULLHD
  }

  for (let i = 0; i < breakpoints.length; i += 1) {
    if (currentWidth >= breakpoints[i] && currentWidth < breakpoints[i + 1]) {
      currentBreakpoint = BreakpointWidthToName[breakpoints[i]]
      break
    }
  }

  return currentBreakpoint
}

type BreakpointState = {
  getCurrentWidth: () => number
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
  const [state, setState] = useState<BreakpointState>({
    getCurrentWidth: () => window.innerWidth,
    currentBreakpoint: undefined,
  })

  useEffect(() => {
    const setBreakpoint = () => {
      const breakpoint = getCurrentBreakpoint()
      setState((prev) => ({ ...prev, currentBreakpoint: breakpoint }))
    }

    setBreakpoint()

    const mediaQueries = breakpoints.map((bp) => window.matchMedia(`(min-width: ${bp}px)`))

    mediaQueries.forEach((mq) => mq.addEventListener("change", setBreakpoint))

    return () => {
      mediaQueries.forEach((mq) => mq.removeEventListener("change", setBreakpoint))
    }
  }, [])

  return state
}
