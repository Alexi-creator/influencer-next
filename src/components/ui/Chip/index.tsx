import clsx from "clsx"

import { CrossIcon } from "@/icons/CrossIcon"

import "./styles.scss"

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  title: string
  content?: string
  count?: number
  onRemove?: (name: string) => void
}

export const Chip = ({ name = "", title, content, count, className = "", onRemove, ...props }: ChipProps) => {
  return (
    <div className={clsx("chip", className)} {...props}>
      {title && <span className="chip__title">{title}: </span>}
      {content && <span className="chip__content">{content}</span>}
      {count && <span className="chip__more">и еще {count}</span>}
      <CrossIcon className="chip__cross" onClick={() => onRemove?.(name)} />
    </div>
  )
}
