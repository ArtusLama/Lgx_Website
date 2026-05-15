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
        :style="{ height: showMenu ? 'calc(100vh - var(--spacing-navbar-height))' : '0' }"
        class="mt-navbar-height bg-gray-100 transition-height duration-300 left-0 right-0 top-0 fixed overflow-hidden md:hidden"
    >
        <ul>
            <li v-for="link in links" :key="link.label" class="px-4 py-2">
                <NavMobileLink :link="link" @click="onLinkClick(link)" />
            </li>

            <li>
                <NuxtLink to="/shop">
                    SHOP
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>
