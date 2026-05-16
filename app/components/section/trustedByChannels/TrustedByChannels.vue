<script setup lang="ts">
const preheading = useTemplateRef<HTMLParagraphElement>("preheading")
const heading = useTemplateRef<HTMLHeadingElement>("heading")
const bigWord = useTemplateRef<HTMLSpanElement>("bigWord")
let cleanupAnimations = () => {}

onMounted(() => {
    const { gsap, SplitText } = useGsap()

    if (!preheading.value || !heading.value || !bigWord.value) {
        return
    }

    const preheadingSplit = new SplitText(preheading.value, { type: "words,chars" })
    const headingSplit = new SplitText(heading.value, { type: "words,chars" })

    const preheadingChars = preheadingSplit.chars
    const headingChars = headingSplit.chars
    const bigWordChars = headingChars.filter(char => bigWord.value?.contains(char))

    gsap.set(preheading.value, {
        display: "inline-block",
        overflow: "hidden",
    })
    gsap.set(preheadingChars, { yPercent: 120 })
    gsap.set(headingChars, { opacity: 0.1 })
    gsap.set(bigWordChars, { fontWeight: 800 })

    const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
            trigger: heading.value,
            start: "top 80%",
            toggleActions: "play none none none",
        },
    })

    let hoverTween: gsap.core.Tween | null = null

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
        .add(() => {
            gsap.to(bigWordChars, {
                fontWeight: 200,
                duration: 1,
                ease: "sine.inOut",
                stagger: {
                    each: 0.4,
                    from: "start",
                    repeat: 2,
                    yoyo: true,
                },
                onComplete: () => {
                    gsap.to(bigWordChars, {
                        fontWeight: 800,
                        duration: 1,
                        ease: "sine.inOut",
                        stagger: { each: 0.05, from: "start" },
                    })
                },
            })
        }, "<+0.5")

    const onEnter = () => {
        hoverTween?.kill()
        hoverTween = gsap.to(bigWordChars, {
            fontWeight: 200,
            duration: 1,
            ease: "sine.inOut",
            stagger: {
                each: 0.4,
                from: "start",
                repeat: -1,
                yoyo: true,
            },
        })
    }

    const onLeave = () => {
        hoverTween?.kill()
        hoverTween = null
        gsap.to(bigWordChars, {
            fontWeight: 800,
            duration: 0.4,
            ease: "sine.inOut",
            stagger: { each: 0.05, from: "end" },
            overwrite: "auto",
        })
    }

    heading.value.addEventListener("pointerenter", onEnter)
    heading.value.addEventListener("pointerleave", onLeave)

    cleanupAnimations = () => {
        heading.value?.removeEventListener("pointerenter", onEnter)
        heading.value?.removeEventListener("pointerleave", onLeave)
        introTimeline.scrollTrigger?.kill()
        introTimeline.kill()
        hoverTween?.kill()
        preheadingSplit.revert()
        headingSplit.revert()
    }
})

onBeforeUnmount(() => {
    cleanupAnimations()
})
</script>

<template>
    <Section secondary-background>
        <div class="font-jakarta">
            <p ref="preheading" class="text-3xl text-primary tracking-wider font-black uppercase font-italic">
                MY CLIENTS:
            </p>
            <h2 ref="heading" class="text-8xl font-black">
                Trusted<br>
                by
                <span ref="bigWord" class="text-primary">
                    BIG
                </span>
                Creators
            </h2>
        </div>

        <SectionTrustedByChannelsView />
    </Section>
</template>
