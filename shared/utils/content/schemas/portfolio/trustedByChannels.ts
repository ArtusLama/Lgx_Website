import { z } from "zod"

export const TrustedByChannelsSchema = z.object({
    channels: z.array(z.object({
        handle: z.string(),
        pinToTop: z.boolean(),
    })).default([]),
})

export type TrustedByChannel = z.infer<typeof TrustedByChannelsSchema>
