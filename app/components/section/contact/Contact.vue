<script setup lang="ts">
const preheading = useTemplateRef<HTMLParagraphElement>("preheading")
const heading = useTemplateRef<HTMLHeadingElement>("heading")

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
        <div class="bg-card px-10 py-6 border border-foreground/10 rounded-lg shadow-xs">
            <h2 class="font-black">
                Contact
            </h2>
            <p>
                Let me help you bring your vision to life!
            </p>
        </div>
    </Section>
</template>
