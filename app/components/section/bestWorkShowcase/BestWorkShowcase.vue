<script setup lang="ts">
const bestWorkImageContainer = useTemplateRef<HTMLDivElement>("bestWorkImageContainer")
const { data: topThumbnails } = useLazyAsyncData("top-4-portfolio-thumbnails", () => queryCollection("portfolioThumbnails").limit(4).all())

onMounted(() => {
    const { gsap } = useGsap()

    const container = bestWorkImageContainer.value
    if (!container)
        return

    const imageWrappers = container.querySelectorAll("div")

    gsap.fromTo(imageWrappers, {
        y: 50,
        scale: 0.95,
        opacity: 0,
        filter: "blur(10px)",
    }, {
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.2,
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
            trigger: container,
            start: "top 90%",
        },
    })
})
</script>

<template>
    <Section>
        <div class="flex flex-col gap-12 items-center">
            <UiFullscreenImageView />
            <div ref="bestWorkImageContainer" class="gap-6 grid grid-cols-1 relative z-20 sm:grid-cols-2">
                <PortfolioImageThumbnail v-for="thumbnail in topThumbnails" :key="thumbnail.stem" :thumbnail="thumbnail" />
            </div>
            <div>
                <UiButton icon as-child>
                    <NuxtLink to="/portfolio">
                        <Icon name="lucide:arrow-right" />
                        View Full Portfolio
                    </NuxtLink>
                </UiButton>
            </div>
        </div>
    </Section>
</template>
