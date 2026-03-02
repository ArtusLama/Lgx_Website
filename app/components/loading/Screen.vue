<script setup lang="ts">
const isLoading = ref(true)

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 3000)

    const lockScroll = useScrollLock(document.body, isLoading.value)
    syncRef(isLoading, lockScroll)

    window.scrollTo(0, 0)

    watch(isLoading, (newVal) => {
        if (newVal) {
            document.body.setAttribute("data-lenis-prevent", "true")
        }
        else {
            document.body.removeAttribute("data-lenis-prevent")
        }
    }, { immediate: true })
})
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isLoading" class="fixed inset-0 z-1000 bg-background-secondary flex items-center justify-center">
                <div class="flex flex-col items-center gap-12">
                    <ClientOnly class="h-30">
                        <LoadingSignatureAnim />
                    </ClientOnly>
                    <p class="font-semibold text-small text-background text-center">
                        Loading portfolio...<br>
                        © 2026 Lgx Art. All rights reserved.
                    </p>
                </div>
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
