import type { Metadata } from "next"

import { AddressProvider } from "@/providers/AddressProvider"
import { AuthProvider } from "@/providers/AuthProvider"
import { GlobalModalProvider } from "@/providers/GlobalModalProvider"

import { Header } from "@/components/layout/header"

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
        <AuthProvider>
          <AddressProvider>
            <GlobalModalProvider>
              <Header />

              {/* <Nav / */}

              <main className="main">
                {children}
              </main>
            </GlobalModalProvider>
          </AddressProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
