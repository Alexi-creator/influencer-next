"use client"

import { createContext, type ReactNode, useState } from "react"

import { authStatuses } from "@/types/authTypes"

interface AuthContextType {
  authStatus: authStatuses
  setAuthStatus: React.Dispatch<React.SetStateAction<authStatuses>>
}

export const AuthContext = createContext<AuthContextType>({
  authStatus: authStatuses.UNKNOWN,
  setAuthStatus: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<authStatuses>(authStatuses.UNKNOWN)

  return <AuthContext value={{ authStatus, setAuthStatus }}>{children}</AuthContext>
}
