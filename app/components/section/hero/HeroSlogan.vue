<script setup lang="ts">
// TODO: Hydration error for the click text split.

const clickText = useTemplateRef<HTMLSpanElement>("clickText")
const clickTextHover = useTemplateRef<HTMLSpanElement>("clickTextHover")
const clickPill = useTemplateRef<HTMLSpanElement>("clickPill")

onMounted(() => {
    const { gsap, SplitText } = useGsap()

    if (!clickText.value)
        return

    const split = SplitText.create(clickText.value, { type: "chars" })

    // on hover move stagger letters up. start at the last letter

    const hoverAnimation = gsap.to(split.chars, {
        yPercent: -120,
        stagger: {
            each: 0.05,
            from: "end",
        },
        paused: true,
        ease: "power2.inOut",
    })

    const typingText = "Another Click"
    const defaultHoverText = clickTextHover.value?.textContent ?? "I know you wanna click"
    let typingTween: gsap.core.Tween | null = null
    let resetTween: gsap.core.Tween | null = null
    let isHovered = false

    const startTyping = () => {
        if (!clickTextHover.value)
            return

        typingTween?.kill()
        clickTextHover.value.textContent = ""

        const chars = typingText.split("")
        const state = { i: 0 }

        typingTween = gsap.to(state, {
            i: chars.length,
            duration: chars.length * 0.05,
            ease: "none",
            onUpdate: () => {
                const count = Math.floor(state.i)
                clickTextHover.value!.textContent = chars.slice(0, count).join("")
            },
            onComplete: () => {
                clickTextHover.value!.textContent = typingText
            },
        })
    }

    const resetHoverText = () => {
        if (!clickTextHover.value)
            return

        typingTween?.kill()
        clickTextHover.value.textContent = defaultHoverText
    }

    const scheduleReset = () => {
        resetTween?.kill()
        resetTween = gsap.delayedCall(0.3, () => {
            if (!isHovered)
                resetHoverText()
        })
    }

    const hoverTarget = clickPill.value ?? clickText.value

    hoverTarget.addEventListener("mouseenter", () => {
        isHovered = true
        resetTween?.kill()
        hoverAnimation.play()
    })
    hoverTarget.addEventListener("mouseleave", () => {
        isHovered = false
        hoverAnimation.reverse()
        scheduleReset()
    })

    if (clickPill.value) {
        clickPill.value.addEventListener("click", () => {
            startTyping()
        })
    }
})
</script>

<template>
    <p class="text-5xl tracking-wide font-bold font-jakarta pt-8 lg:text-8xl sm:text-7xl">
        I made<br>
        <span class="text-primary">100 MILLION</span><br>
        people
        <span ref="clickPill" class="group text-4xl text-primary-foreground px-6 pb-3 pt-1 text-center rounded-full bg-primary flex inline-block cursor-pointer transition-transform items-center justify-center relative overflow-hidden lg:text-7xl sm:text-6xl -mb-3 active:scale-90 hover:scale-95">
            <!-- TODO: Hydration error -->
            <span ref="clickText">click</span>
            <span ref="clickTextHover" class="text-base font-bold opacity-0 flex pointer-events-none transition-opacity transition-delay-100 items-center inset-0 justify-center absolute lg:text-2xl sm:text-xl group-hover:(opacity-100 transition-delay-300)">
                I know you wanna click
            </span>
        </span><br>
        my designs.<br>
    </p>
</template>
