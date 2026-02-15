"use client"

import Link from "next/link"
import { useContext } from "react"
import { Product } from "@/components/Product"
import { Title } from "@/components/Title"
import { Button } from "@/components/ui/Button"
import { Section } from "@/components/ui/Section"
import { GlobalModalContext } from "@/providers/GlobalModalProvider"
import type { ProductTypes } from "@/types/product.schema"

const mockProduct: ProductTypes = {
  id: 1,
  images: [
    "/images/product-img1.png",
    "/images/product-img2.png",
    "/images/product-img3.png",
    "/images/product-img4.png",
    "/images/product-img5.png",
  ],
  point: "Москва",
  deliveryPrice: "350",
  productDescription:
    "Элегантное платье из новой коллекции Gucci. Выполнено из натурального шёлка с добавлением эластана. Идеально подходит для вечерних мероприятий и торжественных случаев.",
  productName: "Платье Gucci из новой коллекции",
  productShortDescription: "Платье вечернее, шёлк, размеры XS–XL",
  rating: 4,
  likesScore: 128,
  postScore: 15,
  postLink: "#",
  sizeOptions: [
    { value: "xs", label: "XS", stock: 12 },
    { value: "s", label: "S", stock: 8 },
    { value: "m", label: "M", stock: 3 },
    { value: "l", label: "L", stock: 5 },
  ],
  amountOptions: [
    { value: "1", label: "1 шт." },
    { value: "2", label: "2 шт." },
    { value: "3", label: "3 шт." },
  ],
  priceCrossed: "45 000",
  priceNew: "36 000",
  discountScore: 20,
  sellerName: "Gucci Official",
  imgSeller: "/images/shop-avatar.png",
  isDiscount: true,
  discountExtra: 25,
  discountExtraSum: "33 750",
  spDiscountLinksFound: "3",
  priceByAmount: {
    "1": "36 000",
    "2": "34 000",
    "3": "32 000",
  },
  productDetails: [
    "Материал: шёлк 95%, эластан 5%",
    "Страна производства: Италия",
    "Артикул: GC-2024-001",
    "Сезон: Весна-Лето 2024",
  ],
  breadcrumbs: [
    { text: "Главная", href: "/" },
    { text: "Каталог", href: "/catalog" },
    { text: "Платья", href: "/catalog?category=dresses" },
  ],
}

export default function ModalProductPage() {
  const { setConfigModal } = useContext(GlobalModalContext)

  const handleOpenModal = () => {
    setConfigModal((prev) => ({
      ...prev,
      isOpen: true,
      className: "product-in-modal",
      title: (
        <>
          <Link href="#" className="product__header-link">
            Перейти к полной версии карточки товара
          </Link>
          <span className="product__header-txt">Быстрый просмотр товара</span>
        </>
      ),
      content: <Product className="product--modal" {...mockProduct} />,
    }))
  }

  return (
    <Section>
      <Title title="Модальное окно товара" />
      <Button onClick={handleOpenModal}>Открыть модальное окно товара</Button>
    </Section>
  )
}
