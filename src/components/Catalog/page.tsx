import Link from "next/link"
import React from "react"
import { BtnShow } from "@/components/BtnShow"

import { Masonry } from "@/components/Masonry"
import { Collapse } from "@/components/ui/Collapse"
import { Tabs } from "@/components/ui/Tabs"
import { ArrowIcon } from "@/icons/ArrowIcon"
import { ClothIcon } from "@/icons/ClothIcon"
import { CloudIcon } from "@/icons/CloudIcon"
import { BREAKPOINT_NAME } from "@/types/breakpointTypes"

import "./styles.scss"

export interface CatalogTypes {
  target: string
  icon: string
  title: string
  items: {
    title: string
    list: {
      title: string
      href: string
    }[]
  }[]
}

interface CatalogProps {
  catalogData: CatalogTypes[]
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "electronics":
      return <ClothIcon />
    case "cloud":
      return <CloudIcon />
    default:
      return <ClothIcon />
  }
}

export const Catalog = ({ catalogData }: CatalogProps) => {
  return (
    <div className="catalog">
      <div className="catalog__mobile">
        <div className="catalog__mobile-title">Категории</div>
        <Masonry
          className="catalog__list catalog__masonry"
          classNameColumn="catalog__masonry-column"
          breakpointsSettings={{
            [BREAKPOINT_NAME.MOBILE]: 1,
            [BREAKPOINT_NAME.TABLET]: 2,
          }}
        >
          {catalogData.map((item) => (
            <ul key={item.title} className="catalog__masonry-item">
              <li className="catalog__item">
                <Collapse
                  initialOpen={false}
                  title={
                    <span className="catalog__item-title">
                      {getIcon(item.icon)}
                      <span className="catalog__item-title-text">{item.title}</span>
                    </span>
                  }
                >
                  {item.items.map((subItem) => (
                    <ul key={subItem.title} className="catalog__list-second">
                      <li>
                        <Collapse
                          initialOpen={false}
                          title={subItem.title}
                          CustomIcon={<ArrowIcon className="catalog__list-second-icon" />}
                        >
                          <ul className="catalog__list-third">
                            {subItem.list.map((item) => (
                              <li key={item.title}>
                                <Link href={item.href}>{item.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </Collapse>
                      </li>
                    </ul>
                  ))}
                </Collapse>
              </li>
            </ul>
          ))}
        </Masonry>
      </div>

      <Tabs
        className="catalog__desktop"
        tabListClassName="catalog__menu"
        tabs={catalogData.map(({ target, icon, title, items }) => ({
          name: target,
          tabClassName: "catalog__menu-item",
          label: (
            <span key={title} className="catalog__item-title">
              {getIcon(icon)}
              <span className="catalog__item-title-text">{title}</span>
            </span>
          ),
          content: (
            <React.Fragment key={title}>
              <div className="catalog__desktop-title">{title}</div>
              {/* TODO из за Masonry все элементы становятся клиентскими, подумать над переделкой если важно ceo */}
              <Masonry
                className="catalog__masonry"
                breakpointsSettings={{
                  [BREAKPOINT_NAME.DESKTOP]: 3,
                  [BREAKPOINT_NAME.FULLHD]: 4,
                }}
              >
                {items.map(({ title, list }) => (
                  <div className="catalog__masonry-item" key={title}>
                    <div className="catalog__masonry-item-title">{title}</div>
                    <ul className="catalog__masonry-list">
                      {/* TODO из за BtnShow все элементы становятся клиентскими, подумать над переделкой если важно ceo */}
                      <BtnShow visibleRowCount={6}>
                        {list.map(({ title, href }, index) => (
                          <li key={index} className="catalog__masonry-list-item">
                            <Link href={href}>{title}</Link>
                          </li>
                        ))}
                      </BtnShow>
                    </ul>
                  </div>
                ))}
              </Masonry>
            </React.Fragment>
          ),
        }))}
      />
    </div>
  )
}
