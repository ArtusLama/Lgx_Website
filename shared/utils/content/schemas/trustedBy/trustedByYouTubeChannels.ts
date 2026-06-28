import { z } from "zod"

export const TrustedByYouTubeChannelsSchema = z.object({
    channels: z.array(z.object({
        handle: z.string(),
        pinToTop: z.boolean(),
    })).default([]),
})

export type TrustedByYouTubeChannels = z.infer<typeof TrustedByYouTubeChannelsSchema>
