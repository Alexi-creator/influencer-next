import { useEffect, useState } from "react"

/**
 * Хук отслеживает пересечение элемента с областью просмотра.
 *
 * @param {Object} params
 * @param {React.RefObject<HTMLElement>} params.ref - Ссылка на DOM-элемент
 * @param {IntersectionObserverInit} [params.options] - Настройки Intersection Observer
 * @param {(entry: IntersectionObserverEntry) => void} [params.callback] - Колбэк, вызываемый при пересечении
 * @param {Boolean} [params.initialValue] - Инициализационное значение
 *
 * @returns {boolean} isVisible - Флаг, показывающий, находится ли элемент в зоне видимости
 */
export const useIntersectionObserver = ({
  ref,
  options = {},
  initialValue = false,
  callback,
}: {
  ref: React.RefObject<HTMLElement | null>
  options?: IntersectionObserverInit
  callback?: (entry: IntersectionObserverEntry) => void
  initialValue?: boolean
}): boolean => {
  const [isIntersection, setIsIntersection] = useState(initialValue)

  useEffect(() => {
    const node = ref?.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersection(entry.isIntersecting)
        callback?.(entry)
      },
      {
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? "0px",
        threshold: options.threshold ?? 0,
      },
    )

    observer.observe(node)

    return () => {
      observer.unobserve(node)
      observer.disconnect()
    }
  }, [ref, options.root, options.rootMargin, options.threshold, callback])

  return isIntersection
}
