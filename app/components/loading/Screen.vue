<script setup lang="ts">
const isLoading = ref(true)

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1500)

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
    <Transition name="fade">
        <div v-if="isLoading" class="fixed inset-0 bg-amber-50 flex items-center justify-center">
            <LoadingSignatureAnim />
        </div>
    </Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
    transition: opacity 1.5s ease-out;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
