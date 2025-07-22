import clsx from "clsx"

import "./styles.scss"

export const Divider = ({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHRElement>) => {
  return (
    <hr className={clsx("divider", className)} {...props} />
  )
}
