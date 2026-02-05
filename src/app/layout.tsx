import type { Metadata } from "next"

import { Header } from "@/components/layout/header"
import { NavPages } from "@/components/NavPages"
import { AddressProvider } from "@/providers/AddressProvider"
import { AuthProvider } from "@/providers/AuthProvider"
import { GlobalModalProvider } from "@/providers/GlobalModalProvider"
import { ReactQueryProvider } from "@/providers/QueryProvider"

import "./globals.css"
import "../styles/common.scss"

export const metadata: Metadata = {
  title: "Influencer",
  description: "Influencer marketplace",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <AuthProvider>
            <AddressProvider>
              <GlobalModalProvider>
                <Header />
                <NavPages />
                <main className="main">{children}</main>
              </GlobalModalProvider>
            </AddressProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
