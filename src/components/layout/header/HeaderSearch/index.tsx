"use client"

import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { Autocomplete } from "@/components/ui/Autocomplete"
import { Select } from "@/components/ui/Select"
import { SearchIcon } from "@/icons/SearchIcon"

export const HeaderSearch = () => {
  return (
    <Autocomplete
      id="search-shops"
      name="search-shops"
      className="header__nav-search-input autocomplete--img autocomplete--select"
      inputClassName="autocomplete__input"
      placeholder="Найдите что-нибудь"
      prefixNode={<SearchIcon />}
      suffixNode={
        <Select
          name="select-search"
          className="select--transparent"
          initialValue="value1"
          initialLabel="Везде"
          options={[
            { value: "value1", label: "Везде" },
            { value: "value2", label: "value 2" },
          ]}
        />
      }
      suffixClass="autocomplete__suffix"
      initialOptions={[
        {
          value: "val1",
          label: "Женское платье Lovely Ran...",
          subLabel: "Товары с Aliexpress.ru",
          href: "#",
          imgSrc: "/images/avatar.jpg",
        },
        {
          value: "val2",
          label: "Короткое платье из денима...",
          subLabel: "Gucci",
          href: "#",
          imgSrc: "/images/sp-slide2.jpg",
        },
      ]}
      renderOption={({ href, imgSrc, value, label, subLabel }, isActive, onClick) => (
        <Link
          key={value}
          href={href || "#"} // TODO убрать заглушку
          className={clsx("autocomplete__options-item", { active: isActive })}
          data-value={value}
          tabIndex={0}
          onClick={onClick}
        >
          {imgSrc && (
            <Image
              className="autocomplete__options-item-img"
              src={imgSrc}
              alt="empty"
              width={32}
              height={48}
              priority
            />
          )}
          <div className="autocomplete__options-item-title">{label}</div>
          <div className="autocomplete__options-item-subtitle">{subLabel}</div>
        </Link>
      )}
    />
  )
}
