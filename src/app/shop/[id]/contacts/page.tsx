import type { Metadata } from "next"

import { ContactsTypes } from "@/app/api/shop/contacts/route"

import { ContactInfo } from "@/components/ContactInfo"
import { Tabs } from "@/components/ui/Tabs"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Shop - contacts",
  description: "Influencer marketplace shop",
}

export default async function ContactsPage() {
  const data = await fetch("http://localhost:3000/api/shop/contacts", {
    next: { revalidate: 120 },
  })
  const contactsData: ContactsTypes = await data.json()

  return (
    <div className="wrapper">
      <Tabs
        tabs={[
          { name: "goods", link: "/shop/1/goods", label: "Товары", count: 500 },
          { name: "sp", link: "/shop/1/sp", label: "Совместные покупки", count: 79 },
          { name: "tff", link: "/shop/1/tff", label: "Test For Free", count: 13 },
          { name: "contacts", link: "/shop/1/contacts", label: "Контакты", },
        ]}
        initialActiveTab="contacts"
        initialSlide={3}
        hasSwiper
      />
      <ContactInfo {...contactsData.data} />
    </div>
  )
}
