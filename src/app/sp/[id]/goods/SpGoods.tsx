"use client"

import { useContext } from "react"
import type { GoodsTypes, ProductCardTypes, ProductMenuTypes } from "@/app/api/sp/[id]/goods/route"
import { CardsWithMenu } from "@/components/CardsWithMenu"
import { DataView } from "@/components/DataView"
import { EntityToolbar } from "@/components/EntityToolbar"
import { Product } from "@/components/Product"
import { ProductCard } from "@/components/ProductCard"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"
import { filtersBreakpoints, filtersSettings, resourceUrl } from "@/settings/sp/goods"
import type { ProductTypes } from "@/types/product.schema"

const mockProduct: ProductTypes = {
  id: 1,
  images: [
    "/images/product-img1.png",
    "/images/product-img2.png",
    "/images/product-img3.png",
    "/images/product-img4.png",
  ],
  point: "Москва",
  deliveryPrice: "350",
  productDescription:
    "Стильное платье из натурального хлопка. Идеально подходит для повседневной носки и особых случаев. Мягкая ткань обеспечивает комфорт в течение всего дня.",
  productName: "Платье летнее хлопковое",
  productShortDescription: "Легкое платье из 100% хлопка с цветочным принтом",
  rating: 4,
  likesScore: 128,
  postScore: 15,
  postLink: "#",
  sizeOptions: [
    { value: "s", label: "S", stock: 12 },
    { value: "m", label: "M", stock: 8 },
    { value: "l", label: "L", stock: 3 },
    { value: "xl", label: "XL", stock: 5 },
  ],
  amountOptions: [
    { value: "1", label: "1 шт." },
    { value: "2", label: "2 шт." },
    { value: "3", label: "3 шт." },
  ],
  priceCrossed: "3 500",
  priceNew: "2 450",
  discountScore: 30,
  sellerName: "Fashion Store",
  imgSeller: "/images/shop-avatar.png",
  isDiscount: true,
  discountExtra: 15,
  discountExtraSum: "2 100",
  spDiscountLinksFound: "3",
  priceByAmount: { "1": "2 450", "2": "2 200", "3": "1 950" },
  productDetails: [
    "Материал: 100% хлопок",
    "Страна производства: Турция",
    "Сезон: Весна-Лето",
    "Длина: Миди",
  ],
  breadcrumbs: [
    { text: "Главная", href: "/" },
    { text: "Одежда", href: "/clothes" },
    { text: "Платья", href: "/clothes/dresses" },
  ],
}

interface SpGoodsProps {
  initialData: GoodsTypes["data"]["goods"]
  menuData: ProductMenuTypes[]
  entityToolbar: {
    name: string
    imgHref: string
  }
}

export const SpGoods = ({ initialData, menuData, entityToolbar }: SpGoodsProps) => {
  const { setConfigModal } = useContext(GlobalModalContext)

  const handleCardClick = (item: ProductCardTypes) => {
    setConfigModal({
      isOpen: true,
      title: item.title,
      className: "product-in-modal",
      content: <Product {...mockProduct} />,
    })
  }

  return (
    <DataView<
      ProductCardTypes,
      { menuData: ProductMenuTypes[]; onCardClick: (item: ProductCardTypes) => void }
    >
      resourceUrl={resourceUrl}
      initialData={initialData}
      filtersSettings={filtersSettings}
      filtersBreakpoints={filtersBreakpoints}
      toolbarConfig={{
        leftSlot: {
          type: "tabs",
          tabs: [{ name: "goods", link: "/sp/1/goods", label: "Товары", count: 500 }],
          initialActiveTab: "goods",
          hasSwiper: false,
        },
        actions: ["sort", "filter", "visibleMode"],
        className: "toolbar--with-tabs",
      }}
      queryKey="goods"
      LeftToolbarComponentAtTop={
        <EntityToolbar name={entityToolbar.name} imgHref={entityToolbar.imgHref} />
      }
      ItemComponent={ProductCard}
      LayoutComponent={CardsWithMenu}
      layoutComponentProps={{
        menuData,
        onCardClick: handleCardClick,
      }}
      className="data-view--none-margin"
    />
  )
}
