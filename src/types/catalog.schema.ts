import { z } from "zod/v4"

export const catalogSchema = z.object({
  target: z.string(),
  icon: z.string(),
  title: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      list: z.array(
        z.object({
          title: z.string(),
          href: z.string(),
        }),
      ),
    }),
  ),
})

export const catalogResponseSchema = z.array(catalogSchema)

export type CatalogTypes = z.infer<typeof catalogSchema>
