import type { Metadata } from "next"

import { AddressProvider } from "@/providers/AddressProvider"
import { GlobalModalProvider } from "@/providers/GlobalModalProvider"

import { Header } from "@/components/layout/header"

import { AddressStatusEnum } from "@/types/addressTypes"

import "./globals.css"
import "../styles/common.scss"

export const metadata: Metadata = {
  title: "Influencer",
  description: "Influencer marketplace",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AddressProvider>
          <GlobalModalProvider>
            <Header
              addressStatus={AddressStatusEnum.EMPTY}
              address=""
            />
            {/* <Nav / */}
            <main className="main">
              {children}
            </main>
          </GlobalModalProvider>
        </AddressProvider>
      </body>
    </html>
  )
}
