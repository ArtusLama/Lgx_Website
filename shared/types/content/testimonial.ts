import { z } from "zod"

export const TestimonialSchema = z.object({
    name: z.string(),
    channelUrl: z.url(),
    channelProfilePicture: z.url(),
    subscribers: z.string(),
    message: z.string(),
})

export type Testimonial = z.infer<typeof TestimonialSchema>
