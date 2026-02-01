"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { CatalogIcon } from "@/icons/CatalogIcon"
import { CrossIcon } from "@/icons/CrossIcon"

export const CatalogButton = () => {
  const path = usePathname()
  const isCatalogPage = path.includes("/catalog")

  return (
    <li
      className={clsx("header__nav-item header__nav-catalog", {
        active: isCatalogPage,
      })}
    >
      <Link href="/catalog" className="btn header__nav-catalog-btn">
        <CatalogIcon className="header__nav-catalog-icon-catalog" />
        <CrossIcon className="header__nav-catalog-icon-cross" />
        Каталог
      </Link>
    </li>
  )
}
