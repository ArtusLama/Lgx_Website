<script setup lang="ts">
defineProps<{
    links: NavigationLink[]
}>()

const isOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
    isOpen.value = false
})

async function handleLogoClick() {
    isOpen.value = false
    useLenis().value?.scrollTo(0)
}

function closeMenu() {
    isOpen.value = false
}

onMounted(() => {
    const lockScroll = useScrollLock(document.body, isOpen.value)
    syncRef(isOpen, lockScroll)
})

watch(isOpen, (newVal) => {
    if (newVal) {
        document.body.setAttribute("data-lenis-prevent", "true")
    }
    else {
        document.body.removeAttribute("data-lenis-prevent")
    }
}, { immediate: true })
</script>

<template>
    <nav class="fixed top-0 left-0 right-0 z-40 p-2">
        <div
            class="border bg-card shadow rounded-lg px-4 py-4 transition-[height] duration-300 ease-in-out overflow-hidden"
            :class="isOpen ? 'h-120' : 'h-19.5'"
        >
            <div
                class="flex items-center justify-between"
            >
                <button
                    type="button"
                    class="flex items-center hover:opacity-80 transition-opacity"
                    @click="handleLogoClick"
                >
                    <SvgHeoSignature class="h-8 w-fit *:fill-primary" />
                </button>
                <div class="flex gap-2 items-center">
                    <UiButton as-child class="text-base justify-start">
                        <NuxtLink
                            to="/shop"
                            class="font-semibold text-muted-foreground tracking-tight flex items-center gap-2"
                            @click="closeMenu"
                        >
                            <Icon name="lucide:shopping-cart" />
                            Shop
                        </NuxtLink>
                    </UiButton>

                    <NavigationMobileBurgerMenuButton v-model="isOpen" />
                </div>
            </div>
            <div class="mt-18 flex flex-col gap-y-2 items-stretch w-full max-w-[24rem] mx-auto">
                <NavigationMobileLink
                    v-for="link in links"
                    :key="link.to"
                    :link="link"
                    @navigate="closeMenu"
                />
                <UiButton as-child class="text-base w-full max-w-[24rem] justify-start">
                    <NuxtLink
                        to="/shop"
                        class="font-semibold text-muted-foreground tracking-tight flex items-center gap-2 w-full text-left"
                        active-class="underline"
                        @click="closeMenu"
                    >
                        <Icon name="lucide:shopping-cart" />
                        Shop
                    </NuxtLink>
                </UiButton>
            </div>
        </div>
    </nav>
</template>
