<script setup lang="ts">
const { links } = defineProps<{
    links: NavigationLink[]
}>()

const middleIndex = Math.ceil(links.length / 2)
const firstHalf = links.slice(0, middleIndex)
const secondHalf = links.slice(middleIndex)

async function handleLogoClick() {
    useLenis().value?.scrollTo(0)
}

const observer = ref<IntersectionObserver | null>(null)
const isHeroVisible = ref(true)

function handleNavVisibility() {
    if (useRouter().currentRoute.value.path !== "/") {
        isHeroVisible.value = false
    }
}

function setupIntersectionObserver() {
    if (observer.value) {
        observer.value.disconnect()
        observer.value = null
    }

    observer.value = new IntersectionObserver(entries => entries.forEach((entry) => {
        if (entry.isIntersecting) {
            isHeroVisible.value = true
        }
        else {
            isHeroVisible.value = false
        }
    }), {
        threshold: 0.5,
    })
    const heroSection = document.querySelector("#hero-nav-observer")
    if (heroSection && observer.value) {
        observer.value.observe(heroSection)
    }
}

onMounted(() => {
    setupIntersectionObserver()
    handleNavVisibility()
})

watch(() => useRoute().path, () => {
    setupIntersectionObserver()
    handleNavVisibility()
})

onBeforeUnmount(() => {
    observer.value?.disconnect()
    observer.value = null
})
</script>

<template>
    <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0 pointer-events-none"
        leave-to-class="opacity-0 pointer-events-none"
    >
        <nav v-show="!isHeroVisible" class="fixed top-0 left-0 right-0 px-8 py-3 flex items-center justify-between z-40 bg-background border-b">
            <div class="flex gap-x-4 grow basis-0 justify-end">
                <NavigationDesktopLink
                    v-for="link in firstHalf"
                    :key="link.to"
                    :link="link"
                />
            </div>

            <div class="mx-8 flex items-center justify-center relative">
                <button
                    type="button"
                    class="flex items-center hover:opacity-80 transition-opacity"
                    @click="handleLogoClick"
                >
                    <SvgHeoSignature class="h-8 sm:h-10 w-fit *:fill-primary" />
                </button>
            </div>

            <div class="flex gap-x-4 grow basis-0 justify-start">
                <NavigationDesktopLink
                    v-for="link in secondHalf"
                    :key="link.to"
                    :link="link"
                />
            </div>

            <div class="absolute right-8">
                <UiButton as-child>
                    <NuxtLink
                        to="/shop"
                        class="flex items-center gap-2"
                    >
                        <Icon name="lucide:shopping-cart" />
                        Shop
                    </NuxtLink>
                </UiButton>
            </div>
        </nav>
    </Transition>
</template>
