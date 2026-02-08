import type { Metadata } from "next"

import { Carts } from "@/components/Carts"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Carts",
  description: "Influencer carts",
  robots: { index: false, follow: false },
}

export default function CartsPage() {
  return (
    <section className="section section--carts">
      <div className="section__inner">
        <Carts />
      </div>
    </section>
  )
}
