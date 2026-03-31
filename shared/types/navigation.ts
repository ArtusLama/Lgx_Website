import { z } from "zod"

export const MavigationLinkSchema = z.object({
    label: z.string(),
    to: z.string(),
    external: z.boolean().optional(),
    scrollToTarget: z.boolean().optional(),
})

export type NavigationLink = z.infer<typeof MavigationLinkSchema>
