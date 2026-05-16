import type { H3Event } from "h3"
import type { YouTubeChannel } from "~~/shared/types/youtubeChannels"
import { z } from "zod"

const routeSchema = z.object({
    handle: z.string().min(1, "YouTube Channel handle is required!"),
})

export default cachedEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { success, data, error } = await getValidatedRouterParams(event, routeSchema.safeParse)

    if (!success || error || !data || !data.handle) {
        throw createError({
            statusCode: 400,
            statusMessage: "YouTube Channel handle is required! Invalid request parameters.",
            data: error,
        })
    }

    try {
        const handle = data.handle.startsWith("@") ? data.handle.slice(1) : data.handle

        const channelInfo = await $fetch<{ items: Array<{
            id: string
            snippet: {
                customUrl?: string
                thumbnails?: {
                    high?: { url?: string }
                    medium?: { url?: string }
                    default?: { url?: string }
                }
            }
            statistics: {
                subscriberCount?: string
                viewCount?: string
            }
        }> }>("https://www.googleapis.com/youtube/v3/channels", {
            params: {
                part: "snippet,statistics",
                forHandle: handle,
                key: config.youtubeApiKey,
            },
        })

        const channel = channelInfo.items?.[0]

        if (!channel) {
            throw createError({
                statusCode: 404,
                statusMessage: "YouTube channel not found.",
                data: error,
            })
        }

        const subscriberCount = Number.parseInt(channel.statistics.subscriberCount || "0", 10)
        const viewsCount = Number.parseInt(channel.statistics.viewCount || "0", 10)

        const profilePictureUrl
            = channel.snippet.thumbnails?.high?.url
                || channel.snippet.thumbnails?.medium?.url
                || channel.snippet.thumbnails?.default?.url
                || ""

        const response: YouTubeChannel = {
            handle: channel.snippet.customUrl || handle,
            profilePictureUrl,
            subscriberCount,
            viewsCount,
            id: channel.id,
            url: `https://www.youtube.com/${channel.snippet.customUrl ? channel.snippet.customUrl : `channel/${channel.id}`}`,
        }

        return response
    }
    catch (err) {
        throw createError({
            statusCode: 502,
            statusMessage: "Failed to fetch YouTube channel info.",
            data: err,
        })
    }
}, {
    maxAge: 60 * 60 * 6, // Cache for 6 hours
    getKey: (event: H3Event) => event.path, // Cache based on the request path
})
