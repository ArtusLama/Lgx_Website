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

function handleLogoClick() {
    closeMenu()
    useScroll().toTop()
}
</script>

<template>
    <div class="pl-8 pr-3 flex h-full w-full items-center justify-between md:hidden">
        <NuxtLink to="/" @click="handleLogoClick">
            <NavLogo />
        </NuxtLink>
        <NavMobileBurgerMenuBtn v-model:is-open="isOpen" class="shrink-0" />
    </div>
</template>
