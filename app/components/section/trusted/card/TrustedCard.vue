<script setup lang="ts">
const props = defineProps<{
    testimonial: Testimonial
}>()

const contentLength = props.testimonial.message.length
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
            <img :src="testimonial.channelProfilePicture" alt="Trusted channel image" class="rounded-full w-14 h-14 object-cover">
            <div class="flex flex-col font-bold">
                <a class="text-xl underline w-fit" :href="testimonial.channelUrl" target="_blank">
                    @{{ testimonial.name }}
                </a>
                <p class="text-primary">
                    {{ testimonial.subscribers }} Subscribers
                </p>
            </div>
        </div>
        <p class="text-lg font-semibold">
            <b>“</b>{{ testimonial.message }}<b>”</b>
        </p>
    </div>
</template>
