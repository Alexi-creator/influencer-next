"use client"

import React, { cloneElement, isValidElement, ReactElement, ReactNode, useState } from "react"
import clsx from "clsx"

import { ArrowIcon } from "@/icons/ArrowIcon"

import "./styles.scss"

interface BtnShowProps {
  visibleRowCount: number
  children: ReactNode
};

/**
 * Компонент BtnShow ограничивает количество отображаемых дочерних элементов
 * и предоставляет кнопку "Развернуть / Свернуть", если элементов больше, чем заданное количество.
 *
 * @param visibleRowCount - Количество дочерних элементов, которые будут показаны по умолчанию (до кнопки "Развернуть").
 * @param children - Дочерние элементы, которые будут отображаться с возможностью сворачивания.
 *
 * @returns ReactNode - JSX с дочерними элементами и, при необходимости, кнопкой "Развернуть / Свернуть".
 */
export const BtnShow = ({
  visibleRowCount,
  children,
} : BtnShowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const childrenArray = React.Children.toArray(children)
  const isShowBtn = childrenArray.length > visibleRowCount

  return (
    <>
      {childrenArray.map((child, idx) => {
        if (!isValidElement(child)) return child

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const element = child as ReactElement<any>
        const shouldHide = idx > visibleRowCount && !isOpen

        return cloneElement(element, {
          className: clsx(element.props.className, {
            "btn-show-hide": shouldHide,
          }),
        })
      })}

      {isShowBtn && (
        <li
          className="btn-show"
          onClick={() => setIsOpen(prev => !prev)}
          role="button"
        >
          {isOpen ? "Свернуть" : "Развернуть"}
          <ArrowIcon className={clsx("btn-show__icon", {
            "btn-show__icon--expand": isOpen,
          })} />
        </li>
      )}
    </>
  )
}
