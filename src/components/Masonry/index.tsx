"use client"

import clsx from "clsx"
import type React from "react"
import { type ReactNode, useMemo } from "react"
import { useBreakpoint } from "@/hooks/useBreakpoint"
import type { BreakpointName } from "@/types/breakpointTypes"

import "./styles.scss"

interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  classNameColumn?: string
  breakpointsSettings: Partial<Record<BreakpointName, number>>
  children: ReactNode[]
}

/**
 * Masonry — универсальный компонент для построения адаптивной сетки с колонками,
 * количество которых зависит от текущего брейкпоинта.
 *
 * Использует хук `useBreakpoint` для определения текущего размера экрана и
 * выбирает количество колонок из `breakpointsSettings`.
 *
 * 📌 Пример использования:
 * ```tsx
 * <Masonry
 *   breakpointsSettings={{ mobile: 1, tablet: 2, desktop: 3 }}
 *   className="my-masonry"
 *   classNameColumn="my-column"
 * >
 *   {items.map(item => <Card key={item.id} {...item} />)}
 * </Masonry>
 * ```
 *
 * @component
 * @param {Object} props - Свойства компонента
 * @param {string} [props.className] - Дополнительный класс для обёртки сетки
 * @param {string} [props.classNameColumn] - Дополнительный класс для каждой колонки
 * @param {Partial<Record<BreakpointName, number>>} props.breakpointsSettings -
 *   Конфигурация количества колонок для разных брейкпоинтов.
 *   Ключи — имена брейкпоинтов (например, "mobile", "tablet", "desktop"),
 *   значения — количество колонок.
 *   Если для текущего брейкпоинта не найдено значение, используется последнее из объекта.
 * @param {ReactNode[]} props.children - Элементы, которые будут распределены по колонкам
 *
 * @returns {JSX.Element | null} JSX элемент с сеткой или `null`, если не удалось вычислить количество колонок
 */
export const Masonry = ({
  className,
  classNameColumn,
  breakpointsSettings,
  children,
}: MasonryProps) => {
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
    <div
      className={clsx("masonry", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {columnWrappers.map((col, idx) => (
        <div key={idx} className={clsx("masonry__column", classNameColumn)}>
          {col}
        </div>
      ))}
    </div>
  )
}
