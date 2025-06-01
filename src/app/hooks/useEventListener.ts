import { useEffect } from "react"

/**
 * @description Хук для навешивания событий
 * @param eventType Тип события (например, 'click', 'keydown')
 * @param handler Обработчик события
 * @param element Элемент, на котором вешается событие (по умолчанию window)
 */
export function useEventListener(
  eventType: string,
  handler: (event: Event) => void,
  element?: EventTarget
) {
  useEffect(() => {
    const target = element ?? (typeof window !== "undefined" ? window : null)
    if (!target || typeof handler !== "function") return

    target.addEventListener(eventType, handler)

    return () => {
      target.removeEventListener(eventType, handler)
    }
  }, [eventType, handler, element])
}
