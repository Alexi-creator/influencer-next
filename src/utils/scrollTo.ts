export const scrollTo = (target?: HTMLElement | null, offset: number = 0) => {
  const main = document.querySelector<HTMLElement>(".main")

  if (target) {
    if (offset) {
      const top = target.getBoundingClientRect().top + (main?.scrollTop ?? 0) - offset

      return main?.scrollTo({ top, behavior: "smooth" })
    }

    target.scrollIntoView({ behavior: "smooth" })
  } else {
    main?.scrollTo({ top: 0, behavior: "smooth" })
  }
}
