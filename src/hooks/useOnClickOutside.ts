import type { RefObject } from "react"
import { useEventListener } from "./useEventListener"

/**
 * Хук привязывает функцию-обработчик к событию "клик вне элемента"
 *
 * @param ref - ссылка на целевой DOM-элемент
 * @param handler - функция-обработчик
 */
export const useOnClickOutside = (
  ref: RefObject<HTMLElement | null>,
  handler: (event: Event) => void,
) => {
  const listener = (event: Event) => {
    const el = ref.current
    if (!el || el.contains(event.target as Node)) return
    handler(event as Event)
  }

  useEventListener("mousedown", listener)
  useEventListener("touchstart", listener)
}
