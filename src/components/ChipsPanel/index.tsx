import clsx from "clsx"

import { Chip } from "@/components/ui/Chip"

import "./styles.scss"

interface ChipsPanelProps {
  isOpen: boolean
  items?: {
    name: string
    label: string
    options: string | string[]
  }[]
  className?: string
  onRemoveChip: (name: string) => void
}

export const ChipsPanel = ({ isOpen, items, className, onRemoveChip, ...props }: ChipsPanelProps) => {
  return (
    <div
      className={clsx("chips-panel", className, {
        active: isOpen,
      })}
      {...props}
    >
      {items?.map(({ label, options, ...rest }) => (
        <Chip
          key={label}
          title={label}
          content={Array.isArray(options) ? options.slice(0, 3).join(", ") : options}
          count={Array.isArray(options) && options.length > 3 ? options.length - 3 : undefined}
          onRemove={onRemoveChip}
          {...rest}
        />
      ))}
    </div>
  )
}
