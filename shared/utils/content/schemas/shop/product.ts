import { z } from "zod"

export const ShopProductSchema = z.object({
    name: z.string(),
    description: z.string(),
})

export type ShopProduct = z.infer<typeof ShopProductSchema>
