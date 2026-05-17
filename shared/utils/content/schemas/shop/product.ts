import { z } from "zod"

const ShopProductTagSchema = z.object({
    label: z.string(),
    color: z.enum(["primary", "secondary", "muted"]),
})

const ShopProductBuyLinkSchema = z.object({
    label: z.string(),
    url: z.string(),
})

export const ShopProductSchema = z.object({
    title: z.string(),
    shortDescription: z.string(),
    tag: ShopProductTagSchema.optional(),
    informationList: z.array(z.string()).default([]),
    price: z.string(),
    deliveryTime: z.string().optional(),
    buyLink: ShopProductBuyLinkSchema,
    examples: z.array(z.string()).default([]),
})

export type ShopProduct = z.infer<typeof ShopProductSchema>
