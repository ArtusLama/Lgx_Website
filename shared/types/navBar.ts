import { z } from "zod"

export const NavBarLinkSchema = z.object({
    label: z.string(),
    to: z.string(),
    external: z.boolean().optional(),
})

export type NavBarLink = z.infer<typeof NavBarLinkSchema>
