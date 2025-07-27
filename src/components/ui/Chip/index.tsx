import clsx from "clsx"

import { CrossIcon } from "@/icons/CrossIcon"

import "./styles.scss"

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  content?: string
  count?: number
  onRemove?: (id: string | number) => void
}

export const Chip = ({
  className = "",
  title,
  content,
  count,
  onRemove,
  ...props
}: ChipProps) => {
  return (
    <div className={clsx("chip", className)} {...props}>
      {title && <span className="chip__title">{title}</span>}
      {content && <span className="chip__content">{content}</span>}
      {count && <span className="chip__more">и еще {count}</span>}
      <CrossIcon className="chip__cross" onClick={() => onRemove?.(title)} />
    </div>
  )
}
