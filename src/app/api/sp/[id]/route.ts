import { NextResponse } from "next/server"

import type { JpDetailsResponseTypes } from "@/types/jpDetails.schema"

const jpDetailsStubs: JpDetailsResponseTypes = {
  data: {
    jpDetails: {
      id: 1,
      title: "Летняя коллекция одежды и аксессуаров Lass со скидкой до 30%",
      status: "progress",
      discountSize: 30,
      discountSum: "136 000",
      oldSum: "79 281",
      allSum: "241 093",
      isActiveSP: 33,
      activityDateDay: "27.01.2025",
      activityDateTime: "12:00",
      shop: {
        name: "Интернет магазин одежды и аксессуаров Lass",
        image: "/images/shop-avatar.png",
      },
      author: {
        name: "Анна Иванова",
        image: "/images/logo-cat.png",
        subscribersNumber: "1 245",
      },
      spDateCreation: "15.12.2024",
      describeSp:
        "Друзья, приглашаю вас в совместную покупку летней коллекции магазина Lass! Здесь вы найдёте стильные платья, юбки, блузы и аксессуары по отличным ценам. При достижении суммы заказа 136 000 ₽ мы получаем скидку 30% на весь ассортимент. Доставка осуществляется по всей России. Присоединяйтесь!",
    },
  },
}

export async function GET() {
  return NextResponse.json(jpDetailsStubs)
}
