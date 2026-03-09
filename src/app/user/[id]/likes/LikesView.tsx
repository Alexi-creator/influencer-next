"use client"

import { useState } from "react"

import type { ProductCardTypes, ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"
import { CardsWithMenu } from "@/components/CardsWithMenu"
import { DataView } from "@/components/DataView"
import type { PostCardTypes } from "@/components/PostCard"
import { PostCard } from "@/components/PostCard"
import { ProductCard } from "@/components/ProductCard"
import { UserBrandToolbar } from "@/components/UserBrandToolbar"
import { Select } from "@/components/ui/Select"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/user/likes"

const LIKES_TYPES = [
  { value: "goods", label: "Товары" },
  { value: "publications", label: "Публикации" },
]

const TABS = [
  { name: "publications", link: "/user/1/publications", label: "Публикации", count: 500 },
  { name: "subscribers", link: "/user/1/subscribers", label: "Подписчики", count: 79 },
  { name: "subscriptions", link: "/user/1/subscriptions", label: "Подписки", count: 13 },
  { name: "likes", link: "/user/1/likes", label: "Нравится", count: 24 },
]

interface LikesViewProps {
  initialData: { data: ProductCardTypes[]; count: number }
  goodsMenuData: ProductMenuTypes[]
}

export const LikesView = ({ initialData, goodsMenuData }: LikesViewProps) => {
  const [likesType, setLikesType] = useState("goods")

  const typeSelect = (
    <Select
      name="likes-type"
      initialValue="goods"
      initialLabel="Товары"
      options={LIKES_TYPES}
      onValueChange={setLikesType}
      className="select--border-grey"
    />
  )

  const sharedProps = {
    filtersSettings,
    filtersBreakpoints,
    toolbarConfig: {
      leftSlot: {
        type: "tabs" as const,
        tabs: TABS,
        initialActiveTab: "likes",
        initialSlide: 3,
        hasSwiper: true,
      },
      rightSlot: {
        type: "autocomplete" as const,
        id: "likes-search",
        name: "likes-search",
        placeholder: "Поиск",
        initialOptions: [],
      },
      actions: ["sort", "filter"] as ["sort", "filter"],
      className: "toolbar--with-tabs",
    },
    LeftToolbarComponentAtTop: <UserBrandToolbar />,
    aboveContent: typeSelect,
    className: "data-view--none-margin",
  }

  if (likesType === "publications") {
    return (
      <DataView<PostCardTypes>
        {...sharedProps}
        resourceUrl={`${resourceUrl}?type=publications`}
        queryKey="user-likes-publications"
        ItemComponent={PostCard}
        contentClassName="post-card-list"
      />
    )
  }

  return (
    <DataView<ProductCardTypes>
      {...sharedProps}
      resourceUrl={`${resourceUrl}?type=goods`}
      initialData={initialData}
      queryKey="user-likes-goods"
      ItemComponent={ProductCard}
      LayoutComponent={CardsWithMenu}
      layoutComponentProps={{ menuData: goodsMenuData }}
      contentClassName="product-card-list"
    />
  )
}
