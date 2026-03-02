<script setup lang="ts">
const props = defineProps<{
    imgUrl: string
    channel: {
        name: string
        url: string
    }
    subscribers: string
    quote: string
}>()

const contentLength = props.quote.length
const cardWidth = computed(() => {
    if (contentLength < 80)
        return "max-w-96"

    if (contentLength < 140)
        return "max-w-108"

    return "max-w-120"
})
</script>

<template>
    <div :class="cardWidth" class="bg-background-secondary/20 border border-background-secondary/50 rounded-lg px-8 py-4 flex flex-col gap-4">
        <div class="flex items-center gap-4">
            <img :src="imgUrl" alt="Trusted channel image" class="rounded-full w-14 h-14 object-cover">
            <div class="flex flex-col font-bold">
                <a class="text-xl underline" :href="channel.url" target="_blank">
                    @{{ channel.name }}
                </a>
                <p class="text-primary">
                    {{ subscribers }} Subscribers
                </p>
            </div>
        </div>
        <p class="text-lg font-semibold">
            <b>“</b>{{ quote }}<b>”</b>
        </p>
    </div>
</template>
