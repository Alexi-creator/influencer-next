"use client"

import { createContext, type ReactNode, useState } from "react"

import { AUTH_STATUS, type AuthStatus } from "@/types/authTypes"

interface AuthContextType {
  authStatus: AuthStatus
  setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatus>>
}

export const AuthContext = createContext<AuthContextType>({
  authStatus: AUTH_STATUS.UNKNOWN,
  setAuthStatus: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AUTH_STATUS.UNKNOWN)

  return <AuthContext value={{ authStatus, setAuthStatus }}>{children}</AuthContext>
}
