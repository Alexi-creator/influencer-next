"use server"

import { revalidateTag } from "next/cache"

import { revalidateCommentsNameTag } from "@/settings/publication"

export async function revalidateComments() {
  revalidateTag(revalidateCommentsNameTag, "max")
}
