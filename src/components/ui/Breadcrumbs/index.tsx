import { HTMLAttributes } from "react"
import clsx from "clsx"
import "./styles.scss"

interface ItemProps {
  text: string
  href?: string
}

interface BreadcrumbsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  title?: string
  items: ItemProps[]
}

export const Breadcrumbs = ({
  className = "",
  title = "",
  items = [],
  ...props
}: BreadcrumbsProps) => {
  return (
    <div
      className={clsx(
        "breadcrumbs",
        className,
      )}
      {...props}
    >
      {title && (
        <span className="breadcrumbs__title">
          {title}
        </span>
      )}
      <ul className="breadcrumbs__list">
        {items.map(item => (
          <li key={item.text} className="breadcrumbs__item">
            {item.href ? (
              <a href={item.href}>{item.text}</a>
            ) : (
              item.text
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
