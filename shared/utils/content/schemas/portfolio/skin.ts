import { property } from "@nuxt/content"
import { z } from "zod"

export const SkinSchema = z.object({
    finalImage: z.object({
        src: property(z.string()).editor({ input: "media" }),
        alt: z.string(),
    }),
})

export type Skin = z.infer<typeof SkinSchema>
