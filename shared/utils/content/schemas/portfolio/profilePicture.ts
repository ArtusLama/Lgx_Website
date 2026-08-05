import { property } from "@nuxt/content"
import { z } from "zod"

export const ProfilePictureSchema = z.object({
    beforeImage: z.object({
        src: property(z.string()).editor({ input: "media" }),
        alt: z.string(),
    }).optional(), // TODO: check if this works. else default someting
    finalImage: z.object({
        src: property(z.string()).editor({ input: "media" }),
        alt: z.string(),
    }),
})

export type ProfilePicture = z.infer<typeof ProfilePictureSchema>
