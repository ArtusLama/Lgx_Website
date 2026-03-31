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
    <Section id="home" name="Home" class="flex flex-col items-center w-screen px-0 h-100 md:h-auto">
        <SectionHeroWrapper class="relative w-full xl:w-300 h-[90vh]! max-h-160 px-4 sm:px-6 md:px-8">
            <div class="text-center flex flex-col items-center">
                <SvgHeoSignature id="hero-signature" class="h-10 sm:h-12 md:h-14 lg:h-16 w-fit -mb-3 sm:-mb-5 md:-mb-7 z-10 *:fill-primary" />
                <p id="hero-title" class="text-foreground-secondary uppercase font-black text-[clamp(2.25rem,9vw,6rem)] leading-[0.9]">
                    <!-- TODO: make bigger?! -->
                    All growth<br>
                    takes time
                </p>
            </div>
            <div id="hero-links" class="hidden md:flex mt-6 sm:mt-8 flex-col gap-6 md:flex-row md:justify-between md:px-10 lg:px-24">
                <SectionHeroLinksList
                    title="Design"
                    :links="[
                        { label: 'Portfolio', to: 'thumbnail-gallery', scrollToTarget: true },
                        { label: 'Reviews', to: 'trusted', scrollToTarget: true },
                        { label: 'Commissions', to: 'shop' },
                        { label: 'Pricing', to: 'shop' },
                    ]"
                />

                <SectionHeroLinksList
                    title="Contact"
                    :links="[
                        { label: 'YouTube', to: 'https://www.youtube.com/@Lgx__', external: true },
                        { label: 'Discord', to: 'https://discord.gg/XJe4JHkQgz', external: true },
                        { label: 'Ko-fi', to: 'https://ko-fi.com/lgxgfx', external: true },
                        { label: 'Partners', to: 'partners' },
                    ]"
                />
            </div>

            <!-- TODO: Size of img!!! responsive -->
            <NuxtImg id="hero-skin-render" alt="Minecraft skin render" src="/imgs/HeroSectionSkinRender.png" class="pointer-events-none select-none absolute bottom-0 sm:-bottom-2 md:-bottom-4 lg:-bottom-6 left-1/2 -translate-x-1/2 z-20 h-[20rem] md:h-[18rem] lg:h-[16rem]" />

            <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-[clamp(7rem,34vw,28rem)] mt-4 -z-10 text-background opacity-15 select-none leading-none">
                LGX
            </p>

            <UiButton
                class="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30"
                @click="useScrollTo('thumbnail-gallery')"
            >
                <Icon name="lucide:sparkles" />
                View my work
            </UiButton>
        </SectionHeroWrapper>
    </Section>
</template>
