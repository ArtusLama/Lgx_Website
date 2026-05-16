import { z } from "zod"

export const TrustedByChannelsSchema = z.object({
    channels: z.array(z.object({
        handle: z.string(),
    })).default([]),
})

export type TrustedByChannel = z.infer<typeof TrustedByChannelsSchema>
