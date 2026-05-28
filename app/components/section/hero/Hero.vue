<script setup lang="ts">
const heroTitle = useTemplateRef<HTMLHeadingElement>("hero-title")
const background = useTemplateRef<HTMLImageElement>("background")
const heroSkinRender = useTemplateRef<HTMLImageElement>("hero-skin-render")
const sloganSection = useTemplateRef<HTMLDivElement>("slogan-section")

onMounted(() => {
    const { gsap, SplitText } = useGsap()

    const backgroundEl = (background.value as any)?.$el ?? background.value
    const heroSkinRenderEl = (heroSkinRender.value as any)?.$el ?? heroSkinRender.value

    if (!heroTitle.value || !heroSkinRenderEl || !backgroundEl || !sloganSection.value)
        return

    const split = SplitText.create(heroTitle.value, {
        type: "lines",
        mask: "lines",
        linesClass: "hero-title-line",
    })
    gsap.set(split.lines, { yPercent: 100 })
    gsap.to(split.lines, {
        yPercent: 0,
        stagger: 0.05,
        ease: "power2.out",
        duration: 1,
    })

    gsap.to(split.lines, {
        scale: 1.05,
        ease: "power2.out",
        scrollTrigger: {
            trigger: heroTitle.value,
            start: "top center",
            end: "bottom top",
            scrub: true,
        },
    })

    gsap.to(heroSkinRenderEl, {
        yPercent: 40,
        scale: 0.9,
        ease: "power2.out",
        scrollTrigger: {
            trigger: heroSkinRenderEl,
            start: "top center",
            end: "top+=300 top",
            scrub: true,
        },
    })

    gsap.to(heroSkinRenderEl, {
        x: 500,
        ease: "power1out",
        scrollTrigger: {
            trigger: heroSkinRenderEl,
            start: "top center",
            end: "top+=300 top",
            scrub: true,
        },
    })

    gsap.to(sloganSection.value, {
        yPercent: -50,
        ease: "power2.out",
        scrollTrigger: {
            trigger: sloganSection.value,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        },
    })

    const pageLoadTimeline = gsap.timeline({ delay: 0.5 })

    pageLoadTimeline.fromTo(
        backgroundEl,
        { scale: 1.2, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.5, ease: "power2.out" },
    )
    pageLoadTimeline.fromTo(
        heroSkinRenderEl,
        { y: 40, scale: 0.98, autoAlpha: 0 },
        { y: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out" },
        "<+0.2",
    )
})
</script>

<template>
    <Section class="px-0! pt-0! *:max-w-screen">
        <div class="flex min-h-screen w-screen items-center relative z-10">
            <NuxtImg ref="background" src="/imgs/HeroBackground.png" alt="Hero Background" class="h-full w-full pointer-events-none select-none left-0 top-0 absolute object-cover object-center -z-10" />

            <div class="mx-auto relative -mt-48">
                <h1 ref="hero-title" class="text-size-[clamp(3rem,12vw,15rem)] text-primary leading-[0.8] tracking-[10] font-black text-center uppercase [&>span]:(py-5 -my-5)">
                    <span>Raspocket</span><br>
                    <span class="text-size-[clamp(4rem,16vw,18rem)]">Studios</span>
                </h1>

                <NuxtImg ref="hero-skin-render" src="/imgs/HeroSkinRender.png" alt="Hero Skin Render" class="w-150 pointer-events-none select-none transform left-1/2 top-[clamp(4rem,14vw,18rem)] absolute z-20 -translate-x-1/2" />
            </div>
        </div>

        <div ref="slogan-section" class="flex w-full items-center justify-center relative z-10 sm:-ml-[10vw]">
            <SectionHeroSlogan />
        </div>
    </Section>
</template>

<style>
/* Fix gsap mask cut-off characters TODO: check if this works */
.hero-title-line {
    padding: 10px !important;
    margin: -10px !important;
}
</style>
