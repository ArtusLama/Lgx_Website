<script setup lang="ts">
defineProps<{
    links: NavBarLink[]
    showMenu: boolean
}>()

const emit = defineEmits<{
    (e: "linkClicked"): void
}>()

function onLinkClick(link: NavBarLink) {
    if (!link.external)
        useScroll().toTop()

    emit("linkClicked")
}
</script>

<template>
    <nav
        aria-label="Mobile Navigation"
        :style="{ height: showMenu ? 'calc(100vh - var(--spacing-navbar-height))' : '0' }"
        class="mt-navbar-height bg-nav-background transition-height duration-300 left-0 right-0 top-0 fixed overflow-hidden md:hidden"
    >
        <ul class="px-8 py-4 flex flex-col gap-6 h-full items-center justify-center">
            <li v-for="link in links" :key="link.label" class="px-4 py-2">
                <NavMobileLink :link="link" @click="onLinkClick(link)" />
            </li>

            <li class="mt-8">
                <UiButton as-child icon>
                    <NuxtLink
                        to="/shop"
                        class="text-xl font-semibold px-8 py-4 rounded-xl hover:opacity-80"
                        active-class="text-primary"
                    >
                        <Icon name="lucide:shopping-cart" class="mr-1" />
                        SHOP
                    </NuxtLink>
                </UiButton>
            </li>
        </ul>
    </nav>
</template>
