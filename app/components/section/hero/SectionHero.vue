<script setup lang="ts">
import { ScrollTrigger } from "gsap/ScrollTrigger"

const { gsap } = useGsap()

function scrollParallax(target: string, speed: number) {
    gsap.to(target, {
        y: (1 - speed) * ScrollTrigger.maxScroll(window),
        ease: "none",
        scrollTrigger: {
            start: 0,
            end: ScrollTrigger.maxScroll(window),
            invalidateOnRefresh: true,
            scrub: 0.5,
        },
    })
}

onMounted(() => {
    scrollParallax("#hero-title", 0.8)
    scrollParallax("#hero-signature", 0.75)
    scrollParallax("#hero-links", 0.8)
    scrollParallax("#hero-skin-render", 0.6)
})
</script>

<template>
    <Section name="Home">
        <SectionHeroWrapper class="relative m-12 h-160 w-300 mx-auto">
            <div class="text-center flex flex-col items-center">
                <SvgHeoSignature id="hero-signature" class="h-16 w-fit -mb-8 z-10 *:fill-primary" />
                <p id="hero-title" class="text-foreground-secondary uppercase font-black text-7xl">
                    All growth<br>
                    takes time
                </p>
            </div>
            <div id="hero-links" class="flex justify-between px-32">
                <SectionHeroLinksList
                    title="Design"
                    :links="[
                        { label: 'Portfolio', scrollTo: '#' },
                        { label: 'Reviews', scrollTo: '#' },
                        { label: 'Commissions', scrollTo: '#' },
                        { label: 'Pricing', scrollTo: '#' },
                    ]"
                />

                <SectionHeroLinksList
                    title="Contact"
                    :links="[
                        { label: 'YouTube', href: '#' },
                        { label: 'Discord', href: '#' },
                        { label: 'Ko-fi', href: '#' },
                        { label: 'Partners', href: '#' },
                    ]"
                />
            </div>

            <NuxtImg id="hero-skin-render" alt="Minecraft skin render" src="/imgs/HeroSectionSkinRender.png" class="pointer-events-none select-none absolute -bottom-18 left-1/2 -translate-x-1/2 z-20" />

            <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[35rem] mt-4 -z-10 text-background opacity-15 select-none">
                LGX
            </p>

            <UiButton
                class="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
                @click="useScrollTo('#')"
            >
                <Icon name="lucide:sparkles" />
                View my work
            </UiButton>
        </SectionHeroWrapper>
    </Section>
</template>
