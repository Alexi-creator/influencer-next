import { NextResponse } from "next/server"

export interface ContactsTypes {
  data: {
    email: string
    phone: string
    schedule: string
    companyName: string
    legalAddress: string
    legalPhone: string
    inn: string
    kpp: string
    ogrn: string
  }
}

const contactsStubs: ContactsTypes = {
  data: {
    email: "info@lass-fashion.ru",
    phone: "+7 (495) 234-34-34",
    schedule: "ПН-ВС 10:00-20:00",
    companyName: "Общество с ограниченной ответственностью «Национальный цифровой ресурс «РУКОНТ»",
    legalAddress: "Юридический адрес: 129090, г. Москва, Протопоповский пер., д. 19, корп. 12",
    legalPhone: "+7(495)719-09-21",
    inn: "7702823270",
    kpp: "770201001",
    ogrn: "1137746876090",
  },
}

export async function GET() {
  return NextResponse.json(contactsStubs)
}
