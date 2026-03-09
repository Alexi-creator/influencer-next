"use client"

import { useState } from "react"

import type { ProductCardTypes, ProductMenuTypes } from "@/app/api/shop/[id]/goods/route"
import type { ShopsTypes } from "@/app/api/shops/route"
import { CardsWithMenu } from "@/components/CardsWithMenu"
import { DataView } from "@/components/DataView"
import { JointPurchasesCard } from "@/components/JointPurchasesCard"
import { ProductCard } from "@/components/ProductCard"
import { ShopCard } from "@/components/ShopCard"
import { UserBrandToolbar } from "@/components/UserBrandToolbar"
import { UserCard } from "@/components/UserCard"
import { Select } from "@/components/ui/Select"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/user/subscriptions"
import type { SpCardTypes } from "@/types/sp.schema"
import type { UserCardTypes } from "@/types/users.schema"

const SUBSCRIPTION_TYPES = [
  { value: "sp", label: "Совместные покупки" },
  { value: "tff", label: "Test For Free" },
  { value: "bloggers", label: "Блогеры" },
  { value: "shops", label: "Магазины" },
]

const TABS = [
  { name: "publications", link: "/user/1/publications", label: "Публикации", count: 500 },
  { name: "subscribers", link: "/user/1/subscribers", label: "Подписчики", count: 79 },
  { name: "subscriptions", link: "/user/1/subscriptions", label: "Подписки", count: 13 },
  { name: "likes", link: "/user/1/likes", label: "Нравится", count: 24 },
]

interface SubscriptionsViewProps {
  initialData: { data: ShopsTypes[]; count: number }
  tffMenuData: ProductMenuTypes[]
}

export const SubscriptionsView = ({ initialData, tffMenuData }: SubscriptionsViewProps) => {
  const [subscriptionType, setSubscriptionType] = useState("shops")

  const typeSelect = (
    <Select
      name="subscription-type"
      initialValue="shops"
      initialLabel="Магазины"
      options={SUBSCRIPTION_TYPES}
      onValueChange={setSubscriptionType}
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
        initialActiveTab: "subscriptions",
        initialSlide: 2,
        hasSwiper: true,
      },
      actions: ["sort", "filter"] as ["sort", "filter"],
      className: "toolbar--with-tabs",
    },
    LeftToolbarComponentAtTop: <UserBrandToolbar />,
    aboveContent: typeSelect,
    className: "data-view--none-margin",
  }

  if (subscriptionType === "sp") {
    return (
      <DataView<SpCardTypes>
        {...sharedProps}
        resourceUrl={`${resourceUrl}?type=sp`}
        queryKey="user-subscriptions-sp"
        ItemComponent={JointPurchasesCard}
        contentClassName="joint-purchases-list"
      />
    )
  }

  if (subscriptionType === "tff") {
    return (
      <DataView<ProductCardTypes>
        {...sharedProps}
        resourceUrl={`${resourceUrl}?type=tff`}
        queryKey="user-subscriptions-tff"
        ItemComponent={ProductCard}
        LayoutComponent={CardsWithMenu}
        layoutComponentProps={{ menuData: tffMenuData }}
        contentClassName="product-card-list"
      />
    )
  }

  if (subscriptionType === "bloggers") {
    return (
      <DataView<UserCardTypes>
        {...sharedProps}
        resourceUrl={`${resourceUrl}?type=bloggers`}
        queryKey="user-subscriptions-bloggers"
        ItemComponent={UserCard}
        contentClassName="user-cards-wrapper"
      />
    )
  }

  return (
    <DataView<ShopsTypes>
      {...sharedProps}
      resourceUrl={`${resourceUrl}?type=shops`}
      initialData={initialData}
      queryKey="user-subscriptions-shops"
      ItemComponent={ShopCard}
      contentClassName="shop-card-list"
    />
  )
}
