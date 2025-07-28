import Link from "next/link"

import "./styles.scss"

export const NavPages = () => {
  return (
    <nav className="nav-pages">
      <ul className="nav-pages__list">
        <li>
          <Link href="/shops">Магазины</Link>
        </li>
        <li>
          <Link href="/">Совместные покупки</Link>
        </li>
        <li>
          <Link href="/">Test for Free</Link>
        </li>
        <li>
          <Link href="/users">Блогеры</Link>
        </li>
        <li>
          <Link href="/">Публикации</Link>
        </li>
      </ul>
    </nav>
  )
}
