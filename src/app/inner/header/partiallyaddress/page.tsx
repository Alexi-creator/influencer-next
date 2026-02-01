"use client"

import { useContext, useEffect } from "react"
import { Divider } from "@/components/ui/Divider"
import { AddressContext } from "@/providers/AddressProvider"
import { AddressStatusEnum } from "@/types/addressTypes"

export default function PartiallyAddressPage() {
  const context = useContext(AddressContext)
  const { setAddressInfo } = context

  useEffect(() => {
    setAddressInfo({ addressStatus: AddressStatusEnum.HALF, currentAddress: "Москва" })
  }, [setAddressInfo])

  return (
    <section className="section">
      <div className="section__inner">
        <h1>Пример хедера с частично заполненным адрессом</h1>
        <Divider />
      </div>
    </section>
  )
}
