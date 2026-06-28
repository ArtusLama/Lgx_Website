import { property } from "@nuxt/content"
import { z } from "zod"

export const PartnerSchema = z.object({
    name: z.string(),
    logo: z.object({
        url: property(z.string()).editor({ input: "media" }),
        alt: z.string(),
    }),
    description: z.string(),
    link: z.object({
        label: z.string(),
        url: z.string(),
    }),
})

export type Partner = z.infer<typeof PartnerSchema>
export type Partners = Partner[]
