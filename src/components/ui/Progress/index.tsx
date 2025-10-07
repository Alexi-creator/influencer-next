import clsx from "clsx"

import "./styles.scss"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "green" | "grey"
  width: string
}

export const Progress = ({
  className = "",
  color = "primary",
  width = "100%",
  ...props
}: ProgressProps) => {
  return (
    <div className={clsx("progress", className, {
      [`progress--${color}`]: color,
    })} {...props}>
      <div className="progress__line" style={{ width }} />
    </div>
  )
}
