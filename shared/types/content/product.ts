import { z } from "zod"

export const ShopProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    detailsList: z.array(z.string()).optional(),
    price: z.string(),
    deliveryTime: z.string(),
    tag: z.object({
        enabled: z.boolean(),
        name: z.string(),
        color: z.enum(["primary", "muted"]),
    }).optional(),
    shopUrl: z.url(),
    exampleImages: z.array(z.url()).optional(),
})

export type ShopProduct = z.infer<typeof ShopProductSchema>
