<script setup lang="ts">
const isOpen = defineModel<boolean>("isOpen", { default: false })
onMounted(() => {
    const scrollLock = useScrollLock(document.documentElement, isOpen.value)
    syncRef(isOpen, scrollLock)
})
watch(isOpen, newVal => document.body.toggleAttribute("data-lenis-prevent", newVal))

function closeMenu() {
    isOpen.value = false
}

const route = useRoute()
watch(() => route.path, closeMenu)

function scrollToTop() {
    const lenis = useLenis().value
    if (lenis) {
        lenis.scrollTo(0)
    }
    else {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
}

function handleLogoClick() {
    closeMenu()
    scrollToTop()
}
</script>

<template>
    <div class="pl-8 pr-3 flex h-full w-full w-full items-center justify-between md:hidden">
        <NavLogo class="cursor-pointer" @click="handleLogoClick" />
        <NavMobileBurgerMenuBtn v-model:is-open="isOpen" class="shrink-0" />
    </div>
</template>
