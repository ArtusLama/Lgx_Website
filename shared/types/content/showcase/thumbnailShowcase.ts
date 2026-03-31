import { z } from "zod"

export const ThumbnailShowcaseSchema = z.object({
    shortDescription: z.string(),
    imageUrl: z.url(),
    beforeImageUrl: z.url().optional(),
})

export type ThumbnailShowcase = z.infer<typeof ThumbnailShowcaseSchema>
