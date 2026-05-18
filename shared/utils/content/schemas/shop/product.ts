import { property } from "@nuxt/content"
import { z } from "zod"

const ShopProductTagSchema = z.object({
    label: z.string(),
    color: z.enum(["primary", "secondary", "muted"]),
})

const ShopProductBuyLinkSchema = z.object({
    label: z.string(),
    url: z.string(),
})

const ShopProductContactLinkSchema = z.object({
    label: z.string(),
    url: z.string(),
})

const ShopProductContactDialogSchema = z.object({
    title: z.string(),
    description: z.string(),
    link: ShopProductContactLinkSchema.optional(),
})

export const ShopProductSchema = z.object({
    title: z.string(),
    shortDescription: z.string(),
    tag: ShopProductTagSchema.optional(),
    informationList: z.array(z.string()).default([]),
    price: z.string(),
    deliveryTime: z.string().optional(),
    buyLink: ShopProductBuyLinkSchema.optional(),
    contactDialog: ShopProductContactDialogSchema.optional(),
    examples: z.array(property(z.string()).editor({ input: "media" })).default([]),
})

export type ShopProduct = z.infer<typeof ShopProductSchema>
