<script setup lang="ts">
const bestWorkImageContainer = useTemplateRef<HTMLDivElement>("bestWorkImageContainer")

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
            start: "top 80%",
            scrub: true,
        },
    })
})
</script>

<template>
    <Section>
        <div ref="bestWorkImageContainer" class="gap-6 grid grid-cols-1 relative z-20 sm:grid-cols-2">
            <SectionBestWorkShowcaseImage>
                <NuxtImg src="/imgs/portfolio/thumbnails/100DaysHardcoreThumbnail.png" />
            </SectionBestWorkShowcaseImage>
            <SectionBestWorkShowcaseImage>
                <NuxtImg src="/imgs/portfolio/thumbnails/PrestigeVsVoilThumbnail.png" />
            </SectionBestWorkShowcaseImage>
            <SectionBestWorkShowcaseImage>
                <NuxtImg src="/imgs/portfolio/thumbnails/TreeTotemThumbnail.png" />
            </SectionBestWorkShowcaseImage>
            <SectionBestWorkShowcaseImage>
                <NuxtImg src="/imgs/portfolio/thumbnails/Bedwars4000StarsMissionThumbnail.png" />
            </SectionBestWorkShowcaseImage>
        </div>
    </Section>
</template>
