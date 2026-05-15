import { property } from "@nuxt/content"
import { z } from "zod"

export const ThumbnailSchema = z.object({
    beforeImage: z.object({
        src: property(z.string()).editor({ input: "media" }),
        alt: z.string(),
    }).optional(), // TODO: check if this orks. else default someting

    finalImage: z.object({
        src: property(z.string()).editor({ input: "media" }),
        alt: z.string(),
    }),

    finalImageVariants: z.array(z.object({
        src: property(z.string()).editor({ input: "media" }),
        alt: z.string(),
    })).default([]),
})

export type Thumbnail = z.infer<typeof ThumbnailSchema>
