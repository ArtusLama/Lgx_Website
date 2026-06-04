<script setup lang="ts">
const props = defineProps<{
    preTitle: string
    title: string
    value: string
}>()

const valueText = useTemplateRef<HTMLSpanElement>("value")
const displayValue = ref(props.value)

let cleanupAnimations = () => {}

function parseValue(raw: string) {
    const trimmed = raw.trim()
    const match = trimmed.match(/[-+]?\d[\d.,]*/)

    if (!match?.[0]) {
        return null
    }

    const numberPart = match[0]
    const startIndex = match.index ?? 0
    const endIndex = startIndex + numberPart.length
    const prefix = trimmed.slice(0, startIndex)
    const suffix = trimmed.slice(endIndex)
    const normalized = numberPart.replace(/,/g, "")
    const parsed = Number.parseFloat(normalized)

    if (!Number.isFinite(parsed)) {
        return null
    }

    const decimals = (normalized.split(".")[1] ?? "").length
    const useGrouping = numberPart.includes(",")

    return {
        prefix,
        suffix,
        value: parsed,
        decimals,
        useGrouping,
    }
}

function formatNumber(value: number, decimals: number, useGrouping: boolean) {
    if (useGrouping) {
        return value.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        })
    }

    return value.toFixed(decimals)
}

onMounted(() => {
    const { gsap, ScrollTrigger } = useGsap()
    const valueNode = valueText.value

    if (!valueNode) {
        return
    }

    const parsed = parseValue(props.value)
    if (!parsed) {
        displayValue.value = props.value
        return
    }

    let countTween: gsap.core.Tween | null = null
    const counter = { value: 0 }
    const step = parsed.decimals > 0 ? 1 / (10 ** parsed.decimals) : 1

    const render = () => {
        displayValue.value = `${parsed.prefix}${formatNumber(counter.value, parsed.decimals, parsed.useGrouping)}${parsed.suffix}`
    }

    const runCountUp = () => {
        countTween?.kill()
        counter.value = 0
        render()

        countTween = gsap.to(counter, {
            value: parsed.value,
            duration: 3,
            ease: "power3.out",
            snap: { value: step },
            onUpdate: render,
        })
    }

    const trigger = ScrollTrigger.create({
        trigger: valueNode,
        start: "top 85%",
        onEnter: runCountUp,
        onEnterBack: runCountUp,
        once: true,
    })

    cleanupAnimations = () => {
        trigger.kill()
        countTween?.kill()
    }
})

onBeforeUnmount(() => {
    cleanupAnimations()
})
</script>

<template>
    <div class="flex flex-col items-center">
        <p class="text-2xl tracking-wider font-semibold opacity-75 uppercase font-italic">
            {{ preTitle }}
        </p>
        <p class="text-8xl text-primary font-black">
            <span ref="value">{{ displayValue }}</span>+
        </p>
        <h3 class="text-5xl tracking-wide font-bold mt-2 uppercase">
            {{ title }}
        </h3>
    </div>
</template>
