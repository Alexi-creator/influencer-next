export const scrollTo = (target?: HTMLElement | null, offset: number = 0) => {
  if (target) {
    if (offset) {
      const top = target.getBoundingClientRect()?.top + window.scrollY - offset

      return window.scrollTo({ top, behavior: "smooth" })
    }

    target.scrollIntoView({ behavior: "smooth" })
  } else {
    document.body.scrollIntoView({ behavior: "smooth" })
  }
}
