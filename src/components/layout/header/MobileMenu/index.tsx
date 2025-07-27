import Image from "next/image"
import Link from "next/link"

import clsx from "clsx"

import { Counter } from "@/components/ui/Counter"

import { CameraIcon } from "@/icons/CameraIcon"
import { CatalogIcon } from "@/icons/CatalogIcon"
import { FeedIcon } from "@/icons/FeedIcon"
import { ProfileIcon } from "@/icons/ProfileIcon"
import { ShoppingBagIcon } from "@/icons/ShoppingBagIcon"

import "./styles.scss"

const menuItems: { href: string; text: string; name: string; count: number }[] = [
  {
    href: "/add-publication",
    text: "Публикация",
    name: "publication",
    count: 0,
  },
  {
    href: "./catalog",
    text: "Каталог",
    name: "catalog",
    count: 0,
  },
  {
    href: "#",
    text: "Лента",
    name: "feed",
    count: 0,
  },
  {
    href: "/carts",
    text: "Корзина",
    name: "shopping-bag",
    count: 1,
  },
  {
    href: "#",
    text: "Профиль",
    name: "profile",
    count: 0,
  },
]

// interface MobileMenuProps extends React.HTMLAttributes<HTMLElement> {
//   isAuth?: boolean
//   activeItem?: "publication" | "catalog" | "feed" | "shopping-bag" | "profile"
// }

// export const MobileMenu = ({ isAuth = false, activeItem }: MobileMenuProps) => {
export const MobileMenu = () => {
  const isAuth = false
  const activeItem = ""

  const getItemIcon = (name: string) => {
    switch (name) {
    case "publication":
      return <CameraIcon className="nav__item-icon" />
    case "catalog":
      return <CatalogIcon className="nav__item-icon" />
    case "feed":
      return <FeedIcon className="nav__item-icon" />
    case "shopping-bag":
      return <ShoppingBagIcon className="nav__item-icon" />
    case "profile":
      return <ProfileIcon className="nav__item-icon" />
    default:
      return <CameraIcon className="nav__item-icon" />
    }
  }

  return (
    <nav className="nav">
      <ul className="nav__list">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={clsx({
              "active": item.name === activeItem,
            })}>
            <Link className={clsx(`nav__item nav__item-${item.name}`)} href={item.href}>
              {item.name === "profile" && isAuth ? (
                <Image
                  className="nav__avatar"
                  width={24}
                  height={24}
                  src="/images/avatar.jpg"
                  alt="avatar"
                />
              ) : getItemIcon(item.name)}
              <div className="nav__item-title">{item.text}</div>
              {item.count > 0 && (
                <div className="nav__item-counter">
                  <Counter color="green">
                    {item.count}
                  </Counter>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
