<script setup lang="ts">
defineProps<{
    channel: YouTubeChannel
}>()

const card = useTemplateRef<HTMLDivElement>("card")

function formatCount(value: number): string {
    return Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
    }).format(value)
}

onMounted(() => {
    // make appear scale up on scroll reveal
    const { gsap } = useGsap()

    if (!card.value)
        return

    gsap.from(card.value, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card.value,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    })
})
</script>

<template>
    <div ref="card" class="flex flex-col items-center">
        <NuxtLink
            external
            :to="channel.url"
            target="_blank"
            class="m-6 rounded-full max-h-64 overflow-hidden object-cover"
        >
            <NuxtImg
                :src="channel.profilePictureUrl"
                :alt="channel.handle"
                class="rounded-full h-full w-full"
            />
        </NuxtLink>

        <NuxtLink
            external
            :to="channel.url"
            target="_blank"
            class="text-2xl font-semibold uppercase"
        >
            {{ channel.handle.replace("@", "") }}
        </NuxtLink>
        <p class="text-xl text-foreground-secondary/75">
            {{ formatCount(channel.subscriberCount) }} SUBS
        </p>
    </div>
</template>
