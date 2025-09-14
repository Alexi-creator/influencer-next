import { NextResponse } from "next/server"

import { CatalogTypes } from "@/components/Catalog/page"

const catalogStubs: CatalogTypes[] = [
  {
    target: "cloth",
    icon: "cloth",
    title: "Красота и здоровье",
    items: [
      {
        title: "Макияж",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" },
          { title: "Гель-лаки и гелевые системы2", href: "#" },
          { title: "Дизайн ногтей2", href: "#" },
          { title: "Гель-лаки и гелевые системы3", href: "#" },
          { title: "Дизайн ногтей3", href: "#" },
          { title: "Гель-лаки и гелевые системы4", href: "#" },
          { title: "Дизайн ногтей4", href: "#" },
          { title: "Гель-лаки и гелевые системы5", href: "#" },
          { title: "Дизайн ногтей5", href: "#" },
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона",
        list: [
          { title: "Тату-машинки и аксессуары", href: "#" },
          { title: "Держатели и наконечники", href: "#" }
        ]
      },
      {
        title: "Макияж2",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона2",
        list: [
          { title: "Тату-машинки и аксессуары", href: "#" },
          { title: "Держатели и наконечники", href: "#" }
        ]
      },
      {
        title: "Макияж3",
        list: [
          { title: "Гель-лаки и гелевые системы3", href: "#" },
          { title: "Дизайн ногтей3", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона3",
        list: [
          { title: "Тату-машинки и аксессуары3", href: "#" },
          { title: "Держатели и наконечники3", href: "#" }
        ]
      }
    ]
  },
  {
    target: "electronics",
    icon: "cloud",
    title: "Electronics",
    items: [
      {
        title: "Electronics",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона",
        list: [
          { title: "Тату-машинки и аксессуары", href: "#" },
          { title: "Держатели и наконечники", href: "#" }
        ]
      },
      {
        title: "Electronics2",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона2",
        list: [
          { title: "Тату-машинки и аксессуары", href: "#" },
          { title: "Держатели и наконечники", href: "#" }
        ]
      },
      {
        title: "Electronics3",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона3",
        list: [
          { title: "Тату-машинки и аксессуары3", href: "#" },
          { title: "Держатели и наконечники3", href: "#" }
        ]
      }
    ]
  },
  {
    target: "cloth2",
    icon: "cloth",
    title: "Красота и здоровье2",
    items: [
      {
        title: "Макияж2",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона2",
        list: [
          { title: "Тату-машинки и аксессуары3", href: "#" },
          { title: "Держатели и наконечники3", href: "#" }
        ]
      },
      {
        title: "Макияж3",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона3",
        list: [
          { title: "Тату-машинки и аксессуары3", href: "#" },
          { title: "Держатели и наконечники3", href: "#" }
        ]
      }
    ]
  },
  {
    target: "electronics2",
    icon: "cloud",
    title: "Electronics2",
    items: [
      {
        title: "Electronics2",
        list: [
          { title: "Гель-лаки и гелевые системы", href: "#" },
          { title: "Дизайн ногтей", href: "#" }
        ]
      },
      {
        title: "Оборудование и материалы для тату-салона",
        list: [
          { title: "Тату-машинки и аксессуары3", href: "#" },
          { title: "Держатели и наконечники3", href: "#" }
        ]
      }
    ]
  }
]

export async function GET() {
  return NextResponse.json(catalogStubs)
}
