<script setup lang="ts">
import type { TrustedByChannel } from "~~/shared/types/content"
import type { YouTubeChannel } from "~~/shared/types/youtubeChannels"

const {
    data: contentChannels,
    error: contentError,
    pending: contentPending,
} = useLazyAsyncData("trustedChannels", () => queryCollection("trustedByChannels").all())

const channels = computed<TrustedByChannel["channels"]>(() => contentChannels.value?.[0]?.channels || [])

const {
    data: channelInfos,
    error: channelsError,
    pending: channelsPending,
    execute: fetchChannelInfos,
} = useLazyAsyncData("trustedChannelsInfo", async () => {
    if (!channels.value.length) {
        return []
    }

    const results = await Promise.all(
        channels.value.map(async (channel) => {
            try {
                return await $fetch<YouTubeChannel>(`/api/getYouTubeChannelInfo/${channel.handle}`)
            }
            catch {
                return null
            }
        }),
    )

    return results.filter((channel): channel is YouTubeChannel => !!channel)
}, { immediate: false })

watch(
    [() => contentPending.value, channels],
    ([isPending]) => {
        if (!isPending && channels.value.length) {
            fetchChannelInfos()
        }
    },
    { immediate: true },
)

const isPending = computed(() => contentPending.value || channelsPending.value)
const hasError = computed(() => !!contentError.value || !!channelsError.value)

const resolvedChannels = computed(() => {
    const items = [...(channelInfos.value || [])]

    return items.sort((a, b) => {
        return b.subscriberCount - a.subscriberCount
    })
})

const showMore = ref(false)

const showChannels = computed(() => {
    if (showMore.value) {
        return resolvedChannels.value
    }
    return resolvedChannels.value.slice(0, 8)
})
</script>

<template>
    <div v-if="isPending" class="py-6 text-center" />
    <div v-else-if="hasError" class="py-6 text-center">
        <p>ERROR loading channels</p>
    </div>
    <div v-else class="mx-auto gap-16 grid grid-cols-1 max-w-[80rem] w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <SectionTrustedByChannelsChannelCard
            v-for="channel in showChannels"
            :key="channel.id"
            :channel="channel"
        />
        <UiButton v-if="channels.length > 4 && !showMore" class="mx-auto col-span-full" icon @click="showMore = true">
            <Icon name="lucide:eye" />
            Show more
        </UiButton>
    </div>
</template>
