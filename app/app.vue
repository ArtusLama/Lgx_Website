<script setup lang="ts">
import { ScrollTrigger } from "gsap/ScrollTrigger"

const lenisRef = useTemplateRef("lenis")
const { gsap } = useGsap()

watchEffect((onInvalidate) => {
    if (!lenisRef.value?.lenis)
        return
    const lenis = lenisRef.value.lenis

    lenis.on("scroll", ScrollTrigger.update)

    function update(time: number) {
        lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)

    gsap.ticker.lagSmoothing(0)

    onInvalidate(() => {
        lenis.off("scroll", ScrollTrigger.update)
        gsap.ticker.remove(update)
    })
})
</script>

<template>
    <div>
        <VueLenis
            ref="lenis"
            root
            :options="{
                duration: 0.75,
                autoToggle: true,
                autoRaf: false,
            }"
        />

        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator
            color="var(--color-primary)"
        />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
