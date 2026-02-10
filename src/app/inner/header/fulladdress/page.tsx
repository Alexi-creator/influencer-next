"use client"

import { useContext, useEffect } from "react"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"
import { AddressContext } from "@/providers/AddressProvider"
import { AddressStatusEnum } from "@/types/addressTypes"

export default function FullAddressPage() {
  const { setAddressInfo } = useContext(AddressContext)

  useEffect(() => {
    setAddressInfo({ addressStatus: AddressStatusEnum.FULL, currentAddress: "Пункт выдачи, Ленинский проспект, 80-21" })
  }, [setAddressInfo])

  return (
    <Section>
      <h1>Пример хедера с заполненным адресом</h1>
      <Divider />
    </Section>
  )
}
