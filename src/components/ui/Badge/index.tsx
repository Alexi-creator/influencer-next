import clsx from "clsx"

import "./styles.scss"

export const Badge = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx("badge", className)} {...props}>
      {children}
    </div>
  )
}
