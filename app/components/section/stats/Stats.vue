<script setup lang="ts">
const preheading = useTemplateRef<HTMLParagraphElement>("preheading")
const heading = useTemplateRef<HTMLHeadingElement>("heading")
const numbersWord = useTemplateRef<HTMLSpanElement>("numbersWord")

let cleanupAnimations = () => {}

onMounted(() => {
    const { gsap, SplitText } = useGsap()

    if (!preheading.value || !heading.value) {
        return
    }

    const preheadingSplit = new SplitText(preheading.value, { type: "words,chars" })
    const headingSplit = new SplitText(heading.value, { type: "words,chars" })

    const preheadingChars = preheadingSplit.chars
    const headingChars = headingSplit.chars

    gsap.set(preheading.value, {
        display: "inline-block",
        overflow: "hidden",
    })
    gsap.set(preheadingChars, { yPercent: 120 })
    gsap.set(headingChars, { opacity: 0.1 })

    const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
            trigger: heading.value,
            start: "top 80%",
            toggleActions: "play none none none",
        },
    })

    introTimeline
        .to(preheadingChars, {
            yPercent: 0,
            duration: 1.2,
            delay: 0.2,
            stagger: { each: 0.04, from: "start" },
        })
        .to(headingChars, {
            opacity: 1,
            duration: 1,
            stagger: { each: 0.05, from: "start" },
        }, "<0.25")

    cleanupAnimations = () => {
        introTimeline.scrollTrigger?.kill()
        introTimeline.kill()
        preheadingSplit.revert()
        headingSplit.revert()
    }
})

onBeforeUnmount(() => {
    cleanupAnimations()
})
</script>

<template>
    <Section>
        <div class="font-jakarta text-center">
            <p ref="preheading" class="text-xl text-primary tracking-wider font-black uppercase font-italic sm:text-3xl">
                STATISTICS:
            </p>
            <h2 ref="heading" class="text-5xl font-black sm:text-8xl">
                <span ref="numbersWord">
                    Numbers
                </span>
                <br>
                don't lie.
            </h2>
        </div>

        <div class="mt-24 gap-24 grid grid-cols-1 xl:grid-cols-3">
            <SectionStatsStatCard pre-title="Generated" title="Views" value="140M" />
            <SectionStatsStatCard pre-title="Made" title="Thumbnails" value="5000" />
            <SectionStatsStatCard pre-title="Worked with" title="Clients" value="40" />
        </div>
    </Section>
</template>
