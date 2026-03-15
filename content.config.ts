import { defineCollection, defineContentConfig } from "@nuxt/content"
import { z } from "zod"

export default defineContentConfig({
    collections: {
        testimonials: defineCollection({
            type: "data",
            source: "testimonials/**.yml",
            schema: z.object({
                name: z.string(),
                channelUrl: z.url(),
                channelProfilePicture: z.url(),
                subscribers: z.string(),
                message: z.string(),
            }),
        }),
        shopCategories: defineCollection({
            type: "data",
            source: "shop/products/**/_category.yml",
            schema: z.object({
                name: z.string(),
            }),
        }),
        shopProducts: defineCollection({
            type: "data",
            source: "shop/products/**/!(_category).yml",
            schema: z.object({
                name: z.string(),
                description: z.string(),
                detailsList: z.array(z.string()).optional(),
                price: z.string(),
                deliveryTime: z.string(),
                tag: z.object({
                    name: z.string(),
                    color: z.enum(["primary", "muted", "destructive"]),
                }).optional(),
                shopUrl: z.url(),
                exampleImages: z.array(z.url()).optional(), // TODO: maybe other format
            }),
        }),
    },
})
