import { z } from "zod"

export const ShopCategorySchema = z.object({
    name: z.string(),
})

export type ShopCategory = z.infer<typeof ShopCategorySchema>
