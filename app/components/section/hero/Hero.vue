<script setup lang="ts">
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
    <Section class="min-h-screen w-full items-start relative">
        <div class="z-10] flex flex-col gap-24 h-full w-full relative">
            <h1 class="text-[12em] leading-[1] tracking-tight font-black font-jakarta">
                <span class="text-primary">
                    Raspocket
                </span><br>
                Studios
            </h1>

            <p class="text-8xl tracking-wide font-bold font-jakarta">
                I made<br>
                <span class="text-primary">40 Million</span><br>
                people
                <span ref="clickPill" class="group text-7xl text-primary-foreground px-6 pb-3 pt-1 text-center rounded-full bg-primary flex inline-block cursor-pointer transition-transform items-center justify-center relative overflow-hidden -mb-3 hover:scale-95">
                    <span ref="clickText">click</span>
                    <span ref="clickTextHover" class="text-2xl font-bold opacity-0 flex pointer-events-none transition-opacity transition-delay-100 items-center inset-0 justify-center absolute group-hover:(opacity-100 transition-delay-300)">
                        I know you wanna click
                    </span>
                </span><br>
                my designs.<br>
            </p>
        </div>
    </Section>
</template>
