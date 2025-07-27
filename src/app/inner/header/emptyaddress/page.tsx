"use client"

export const dynamic = "force-static"

import { useContext, useEffect } from "react"

import { AddressContext } from "@/providers/AddressProvider"

import { AddressStatusEnum } from "@/types/addressTypes"

import { Divider } from "@/components/ui/Divider"


export default function EmptyAddressPage() {
  const { setAddressInfo } = useContext(AddressContext)

  useEffect(() => {
    setAddressInfo({ addressStatus: AddressStatusEnum.EMPTY, currentAddress: ""  })
  }, [setAddressInfo])

  return (
    <section className="section">
      <div className="section__inner">
        <h1>Пример хедера с незаполненным адрессом</h1>
        <Divider />
      </div>
    </section>
  )
}
