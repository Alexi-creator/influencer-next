"use client"

import { createContext, type ReactNode, useState } from "react"

import { ADDRESS_STATUS, type AddressStatus } from "@/types/addressTypes"
// import { DELIVERY_METHOD, type DeliveryMethod } from "@/types/deliveryMethodTypes"

export interface AddressProps {
  currentAddress?: string
  addressStatus?: AddressStatus
  // deliveryMethod?: DeliveryMethod
}

interface AddressContextType {
  addressInfo: AddressProps
  setAddressInfo: React.Dispatch<React.SetStateAction<AddressProps>>
}

export const AddressContext = createContext<AddressContextType>({
  addressInfo: {
    currentAddress: "",
    addressStatus: ADDRESS_STATUS.FULL,
    // deliveryMethod: DELIVERY_METHOD.COURIER,
  },
  setAddressInfo: () => {},
})

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addressInfo, setAddressInfo] = useState<AddressProps>({
    currentAddress: "Москва",
    addressStatus: ADDRESS_STATUS.FULL,
  })

  return <AddressContext value={{ addressInfo, setAddressInfo }}>{children}</AddressContext>
}
