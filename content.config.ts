import { defineCollection, defineContentConfig } from "@nuxt/content"
import { z } from "zod"

export default defineContentConfig({
    collections: {
        testimonials: defineCollection({
            type: "data",
            source: "testimonials/**.yml",
            schema: z.object({
                sort: z.number().int().positive(),
                name: z.string(),
                channelUrl: z.url(),
                channelProfilePicture: z.url(),
                subscribers: z.string(),
                message: z.string(),
            }),
        }),
    },
})
