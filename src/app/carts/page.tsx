import type { Metadata } from "next"

import { Carts } from "@/components/Carts"
import { Section } from "@/components/ui/Section"

import "./styles.scss"

export const metadata: Metadata = {
  title: "Carts",
  description: "Influencer carts",
  robots: { index: false, follow: false },
}

export default function CartsPage() {
  return (
    <Section className="section--carts">
      <Carts />
    </Section>
  )
}
