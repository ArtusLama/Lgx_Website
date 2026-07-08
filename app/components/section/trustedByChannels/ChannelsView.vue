<script setup lang="ts">
// TODO: Hydration error for SectionTrustedByChannelsChannelCard and UiButton! -> Pre=None, Post=Whole Component
const {
    data: contentChannelsQuery,
    error: contentError,
    pending: contentPending,
} = useLazyAsyncData("trustedChannels", () => queryCollection("trustedByChannels").all())

const contentChannels = computed<TrustedByYouTubeChannels["channels"]>(() => contentChannelsQuery.value?.[0]?.channels || [])

const {
    data: channels,
    error: channelsError,
    pending: channelsPending,
    execute: fetchChannelInfos,
} = useLazyAsyncData("trustedChannelsInfo", async () => {
    if (!contentChannels.value.length) {
        return []
    }

    const results = await Promise.all(
        contentChannels.value.map(async (channel) => {
            try {
                return {
                    contentEntry: channel,
                    data: await $fetch<YouTubeChannel>(`/api/getYouTubeChannelInfo/${channel.handle}`),
                }
            }
            catch {
                return null
            }
        }),
    )

    return results.filter((result): result is NonNullable<typeof result> => !!result)
}, { immediate: false })

const isMounted = ref(false)

watch([contentChannels, isMounted], ([channels, mounted]) => {
    if (mounted && channels.length && !channelsPending.value) {
        void fetchChannelInfos()
    }
}, { immediate: true })

onMounted(() => {
    isMounted.value = true
})

const isPending = computed(() => contentPending.value || channelsPending.value)
const hasError = computed(() => !!contentError.value || !!channelsError.value)

const resolvedChannels = computed(() => {
    const items = [...(channels.value || [])]

    return items.sort((a, b) => {
        if (a.contentEntry.pinToTop !== b.contentEntry.pinToTop) {
            return a.contentEntry.pinToTop ? -1 : 1
        }

        return b.data.subscriberCount - a.data.subscriberCount
    }) || []
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
        <LazySectionTrustedByChannelsChannelCard
            v-for="channel in showChannels"
            :key="channel.data.id"
            :channel="channel.data"
        />
        <UiButton v-if="resolvedChannels.length > 4 && !showMore" class="mx-auto col-span-full h-fit" icon @click="showMore = true">
            <Icon name="lucide:eye" />
            Show more
        </UiButton>
    </div>
</template>
