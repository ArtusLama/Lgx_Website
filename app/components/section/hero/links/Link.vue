<script setup lang="ts">
const props = defineProps<{
    link: NavigationLink
}>()

function onClick(event: PointerEvent) {
    if (props.link.scrollToTarget) {
        event.preventDefault()
        useScrollTo(props.link.to)
    }
}

const linkTextElement = useTemplateRef<HTMLElement>("linkTextElement")
const { gsap } = useGsap()

let splitText: { chars: Element[], revert: () => void } | null = null

onMounted(async () => {
    if (!linkTextElement.value)
        return

    const { SplitText } = await import("gsap/SplitText")

    splitText = SplitText.create(linkTextElement.value, {
        type: "chars",
        charsClass: "roll-char",
    })

    gsap.set(splitText.chars, {
        yPercent: 0,
        lineHeight: 1,
        willChange: "transform",
    })
})

onBeforeUnmount(() => {
    if (splitText?.chars?.length)
        gsap.killTweensOf(splitText.chars)

    splitText?.revert()
    splitText = null
})

function playRoll(direction: "up" | "down") {
    if (!splitText?.chars?.length)
        return

    const chars = splitText.chars
    const target = direction === "up" ? -100 : 0

    gsap.killTweensOf(chars)

    gsap.to(chars, {
        yPercent: target,
        duration: 0.45,
        ease: "power3.out",
        stagger: {
            each: 0.012,
            from: direction === "up" ? "start" : "end",
        },
    })
}
</script>

<template>
    <li>
        <NuxtLink
            :to="props.link.scrollToTarget ? `#${props.link.to}` : props.link.to"
            :target="props.link.external ? '_blank' : '_self'"
            :external="props.link.external"
            class="hero-link inline-block leading-none select-none"
            @mouseenter="playRoll('up')"
            @mouseleave="playRoll('down')"
            @click="onClick"
        >
            <span class="roll-line-mask">
                <span ref="linkTextElement">{{ props.link.label }}</span>
            </span>
        </NuxtLink>
    </li>
</template>

<style scoped>
.hero-link {
    position: relative;
    padding-bottom: 0.08em;
}

.hero-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.08em;
    background: currentcolor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero-link:hover::after,
.hero-link:focus-visible::after {
    transform: scaleX(1);
}

.roll-line-mask {
    display: inline-block;
    overflow: hidden;
    line-height: 1;
    vertical-align: top;
    user-select: none;
}

:deep(.roll-char) {
    display: inline-block;
    line-height: 1;
    text-shadow: 0 1em currentcolor;
}
</style>
