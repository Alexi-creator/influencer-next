/**
 * API Route для продукта (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
 *
 * ⚠️ Это моковый API для тестирования без бэкенда.
 */

import { NextResponse } from "next/server"

import type { ProductTypes } from "@/types/product"

const getProductData = (id: number): ProductTypes => ({
  id,
  images: [
    "/images/publication.jpg",
    "/images/post-card-img-black.png",
    "/images/publication.jpg",
    "/images/post-card-img-black.png",
    "/images/publication.jpg",
  ],
  point: "Москва",
  deliveryPrice: "350",
  productDescription:
    "Куртка из кожи ягнёнка с наполнителем из гусиного пуха. Модель прямого кроя с воротником-стойкой, застёжкой на молнию и двумя боковыми карманами. Манжеты на кнопках. Подкладка из вискозы и купро.",
  productName: "Куртка кожаная BOTTEGA VENETA",
  productShortDescription: "Куртка из натуральной кожи с пуховым наполнителем",
  likesScore: 24,
  postScore: 7,
  postLink: "/publication/1",
  sizeOptions: [
    { value: "34", label: "34 EU / XS" },
    { value: "36", label: "36 EU / S" },
    { value: "38", label: "38 EU / M" },
    { value: "40", label: "40 EU / L" },
    { value: "42", label: "42 EU / XL" },
  ],
  amountOptions: [
    { value: "1", label: "1 шт." },
    { value: "2", label: "2 шт." },
    { value: "3", label: "3 шт." },
    { value: "4", label: "4 шт." },
    { value: "5", label: "5 шт." },
  ],
  priceCrossed: "385 000",
  priceNew: "346 500",
  discountScore: 10,
  sellerName: "BOTTEGA VENETA Official",
  imgSeller: "/images/logo-user-sm.jpg",
  isDiscount: true,
  discountExtra: 15,
  discountExtraSum: "327 250",
  spDiscountLinksFound: "3",
  breadcrumbs: [
    { text: "Платья и сарафаны", href: "#" },
    { text: "Блузы и рубашки", href: "#" },
    { text: "Юбки", href: "" },
    { text: "+ еще 12", href: "" },
  ],
})

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const { id } = await params

  return NextResponse.json({
    data: {
      data: getProductData(Number(id)),
    },
  })
}
