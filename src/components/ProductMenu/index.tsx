import type { ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"

import { Collapse } from "@/components/ui/Collapse"

import "./styles.scss"

const MenuItem = ({ item }: { item: ProductMenuTypes }) => (
  <li className="product-menu__item">
    {item.children ? (
      <Collapse
        className="product-menu__item-collapse"
        title={
          <span className="product-menu__title">
            {item.title}
            <span className="product-menu__count">{item.count}</span>
          </span>
        }
        initialOpen={false}
        hideIcon={true}
      >
        <ul className="product-menu__submenu">
          {item.children.map((child, index) => (
            <MenuItem key={index} item={child} />
          ))}
        </ul>
      </Collapse>
    ) : (
      item.title
    )}
    {/* TODO вместо item.title тут должна быть ссылка */}
  </li>
)

export const ProductMenu = ({ items }: { items: ProductMenuTypes[] }) => (
  <ul className="product-menu">
    {items.map((item, index: number) => (
      <MenuItem key={index} item={item} />
    ))}
  </ul>
)
