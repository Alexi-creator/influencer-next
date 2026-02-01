"use server"

import { revalidateTag } from "next/cache"

import { revalidateNameTag } from "@/settings/carts"

export async function revalidateCarts() {
  revalidateTag(revalidateNameTag, "max")
}
