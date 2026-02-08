/**
 * API Route для публикаций (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
 *
 * ⚠️ Это моковый API для тестирования без бэкенда.
 */

import { NextResponse } from "next/server"

import type { PublicationTypes } from "@/types/publication"

const getPublicationData = (): PublicationTypes => ({
  id: 1,
  authorName: "Олеся Смирнова",
  authorAvatar: "/images/logo-user-sm.jpg",
  createdAt: "17 минут назад",
  title: "Светлый образ на холодную весну",
  views: 6072,
  description:
    "Безупречный белый позволителен дамам любого возраста и рода занятий, делая внешность неотразимой и такой безукоризненной. Облачаясь в белый цвет с ног до головы этой весной, отдавайте предпочтение белым платьям на весну, брючным костюмам, рубашкам и блузкам в белом цвете, а также и верхней одежде в белом цвете на весну. Именно белый цвет в модных образах весны 2021 будет на пике популярности для многих барышень.",
  totalPrice: "97 062 ₽",
  likes: 16,
  hashtags: ["#весна22", "#холод", "#лучшийобраз", "#костюмы", "#недешево"],
  authorActivity: "Персональный стилист / Актриса / Блогер",
  publicationItems: [
    {
      id: 1,
      img: "/images/item-publication.jpg",
      title: "Костюм классический UNIQ",
      price: "32 500",
      currency: "₽",
    },
    {
      id: 2,
      img: "/images/item-publication.jpg",
      title: "Костюм классический UNIQ",
      price: "18 900",
      currency: "₽",
    },
    {
      id: 3,
      img: "/images/item-publication.jpg",
      title: "Костюм классический UNIQ",
      price: "45 662",
      currency: "₽",
    },
    {
      id: 4,
      img: "/images/item-publication.jpg",
      title: "Пальто белое",
      price: "32 500",
      currency: "₽",
    },
    {
      id: 5,
      img: "/images/item-publication.jpg",
      title: "Брюки классические",
      price: "18 900",
      currency: "₽",
    },
    {
      id: 6,
      img: "/images/item-publication.jpg",
      title: "Блузка шёлковая",
      price: "45 662",
      currency: "₽",
      descr: "Итальянский шёлк",
    },
    {
      id: 7,
      img: "/images/item-publication.jpg",
      title: "Блузка шёлковая",
      price: "45 662",
      currency: "₽",
      descr: "Итальянский шёлк",
    },
    {
      id: 8,
      img: "/images/item-publication.jpg",
      title: "Пальто белое",
      price: "32 500",
      currency: "₽",
    },
    {
      id: 9,
      img: "/images/item-publication.jpg",
      title: "Брюки классические",
      price: "18 900",
      currency: "₽",
    },
    {
      id: 10,
      img: "/images/item-publication.jpg",
      title: "Блузка шёлковая",
      price: "45 662",
      currency: "₽",
      descr: "Итальянский шёлк",
    },
  ],
  galleryItems: [
    { id: 1, imgHref: "/images/publication.jpg" },
    { id: 2, imgHref: "/images/post-card-img-black.png" },
    { id: 3, imgHref: "/images/publication.jpg" },
    { id: 4, imgHref: "/images/publication.jpg" },
    { id: 5, imgHref: "/images/post-card-img-black.png" },
    { id: 6, imgHref: "/images/publication.jpg" },
    { id: 7, imgHref: "/images/publication.jpg" },
    { id: 8, imgHref: "/images/post-card-img-black.png" },
    { id: 9, imgHref: "/images/publication.jpg", moreCount: 7 },
  ],
  swiperImages: [
    "/images/publication.jpg",
    "/images/post-card-img-black.png",
    "/images/publication.jpg",
  ],
})

export async function GET() {
  return NextResponse.json({
    data: {
      data: getPublicationData(),
    },
  })
}
