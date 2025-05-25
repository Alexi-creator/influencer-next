import type { Metadata } from 'next'
import './globals.css'
import './styles/common.scss'

export const metadata: Metadata = {
  title: 'Influenser',
  description: 'next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        {/* <Nav / */}
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  )
}
