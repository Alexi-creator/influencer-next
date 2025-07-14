export const scrollTo = (target?: HTMLElement | null) => {
  if (target) {
    target.scrollIntoView({ behavior: "smooth" })
  } else {
    document.body.scrollIntoView({ behavior: "smooth" })
  }
}
