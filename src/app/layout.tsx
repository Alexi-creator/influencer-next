import type { Metadata } from "next"
import localFont from "next/font/local"

import { Header } from "@/components/layout/header"
import { NavPages } from "@/components/NavPages"
import { AddressProvider } from "@/providers/AddressProvider"
import { AuthProvider } from "@/providers/AuthProvider"
import { GlobalModalProvider } from "@/providers/GlobalModalProvider"
import { ReactQueryProvider } from "@/providers/QueryProvider"

import "./reset.css"
import "./variables.css"
import "../styles/common.scss"

const commissioner = localFont({
  src: [
    { path: "../fonts/Commissioner-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Commissioner-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Commissioner-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-commissioner",
  display: "swap",
})

const bebasNeue = localFont({
  src: [{ path: "../fonts/BebasNeue-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-bebas",
  display: "swap",
})

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
      <body className={`${commissioner.variable} ${bebasNeue.variable}`}>
        <ReactQueryProvider>
          <AuthProvider>
            <AddressProvider>
              <GlobalModalProvider>
                <Header />

                <main className="main">
                  <NavPages />
                  <div className="main__content">{children}</div>
                </main>
              </GlobalModalProvider>
            </AddressProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
