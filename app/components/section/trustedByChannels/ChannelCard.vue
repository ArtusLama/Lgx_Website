<script setup lang="ts">
defineProps<{
    channel: YouTubeChannel
}>()

function formatCount(value: number): string {
    return Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
    }).format(value)
}
</script>

<template>
    <div class="flex gap-4 items-center">
        <NuxtImg
            :src="channel.profilePictureUrl"
            :alt="channel.handle"
            class="rounded-full size-14 object-cover"
        />
        <div class="min-w-0">
            <NuxtLink
                external
                :to="channel.url"
                target="_blank"
                class="font-bold underline truncate"
            >
                {{ channel.handle }}
            </NuxtLink>
            <p class="text-sm text-gray-500">
                {{ formatCount(channel.subscriberCount) }} subs
            </p>
        </div>
    </div>
</template>
