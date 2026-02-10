"use client"

import { useContext, useEffect } from "react"
import { Divider } from "@/components/ui/Divider"
import { Section } from "@/components/ui/Section"
import { AddressContext } from "@/providers/AddressProvider"
import { AddressStatusEnum } from "@/types/addressTypes"

export default function PartiallyAddressPage() {
  const context = useContext(AddressContext)
  const { setAddressInfo } = context

  useEffect(() => {
    setAddressInfo({ addressStatus: AddressStatusEnum.HALF, currentAddress: "Москва" })
  }, [setAddressInfo])

  return (
    <Section>
      <h1>Пример хедера с частично заполненным адрессом</h1>
      <Divider />
    </Section>
  )
}
