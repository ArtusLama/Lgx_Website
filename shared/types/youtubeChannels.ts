import { z } from "zod"

export const YouTubeChannelSchema = z.object({
    id: z.string(),
    handle: z.string(),
    url: z.string(),
    subscriberCount: z.number(),
    viewsCount: z.number(),
    profilePictureUrl: z.string(),
})

export type YouTubeChannel = z.infer<typeof YouTubeChannelSchema>
