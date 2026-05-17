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
    <div class="flex flex-col gap-2 items-center">
        <NuxtImg
            :src="channel.profilePictureUrl"
            :alt="channel.handle"
            class="p-4 rounded-full max-h-64 object-cover"
        />
        <NuxtLink
            external
            :to="channel.url"
            target="_blank"
            class="text-xl font-semibold underline"
        >
            {{ channel.handle }}
        </NuxtLink>
        <p class="text-lg text-primary font-bold">
            {{ formatCount(channel.subscriberCount) }} subs
        </p>
    </div>
</template>
