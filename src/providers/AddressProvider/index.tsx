"use client"

import { createContext, type ReactNode, useState } from "react"

import { AddressStatusEnum } from "@/types/addressTypes"
// import { deliveryMethodTypes } from "@/types/deliveryMethodTypes"

export interface AddressProps {
  currentAddress?: string
  addressStatus?: AddressStatusEnum
  // deliveryMethod?: deliveryMethodTypes
}

interface AddressContextType {
  addressInfo: AddressProps
  setAddressInfo: React.Dispatch<React.SetStateAction<AddressProps>>
}

export const AddressContext = createContext<AddressContextType>({
  addressInfo: {
    currentAddress: "",
    addressStatus: AddressStatusEnum.FULL,
    // deliveryMethod: deliveryMethodTypes.COURIER,
  },
  setAddressInfo: () => {},
})

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addressInfo, setAddressInfo] = useState<AddressProps>({
    currentAddress: "Москва",
    addressStatus: AddressStatusEnum.FULL,
  })

  return <AddressContext value={{ addressInfo, setAddressInfo }}>{children}</AddressContext>
}
