<script setup lang="ts">
const isLoading = ref(true)
const logo = useTemplateRef<HTMLElement>("logo")

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)

    const scrollLock = useScrollLock(document.documentElement, isLoading.value)
    syncRef(isLoading, scrollLock)

    window.scrollTo(0, 0)

    watch(isLoading, newVal => document.body.toggleAttribute("data-lenis-prevent", newVal))

    const { gsap } = useGsap()

    if (!logo.value)
        return

    gsap.timeline()
        .to(logo.value, {
            scale: 1.2,
            duration: 0.8,
            ease: "power2.out",
        })
        .to(logo.value, {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
        })
})
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isLoading" class="bg-background flex items-center inset-0 justify-center fixed z-1000">
                <div ref="logo" class="flex flex-col gap-12 items-center">
                    <SvgLogoSignature class="text-foreground/50 h-20 animate-pulse" />
                </div>
                <p class="text-sm text-foreground/25 font-semibold text-center bottom-8 absolute">
                    Loading portfolio...<br>
                    © {{ new Date().getFullYear() }} Lgx Art. All rights reserved.
                </p>
            </div>
        </Transition>
    </Teleport>
</template>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s ease-out;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
