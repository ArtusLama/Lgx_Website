<script setup lang="ts">
const navigationLinks: NavBarLink[] = [
    { label: "Home", to: "/" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "YouTube", to: "https://www.youtube.com/@Lgx__", external: true },
    { label: "Discord", to: "https://discord.gg/XJe4JHkQgz", external: true },
]

const isMobileMenuOpen = ref(false)
</script>

<template>
    <header class="bg-gray-300 flex h-navbar-height items-center left-0 right-0 top-0 sticky z-50">
        <NavDesktopBar :links="navigationLinks" />

        <NavMobileBar v-model:is-open="isMobileMenuOpen" />
        <NavMobileMenuContent
            :show-menu="isMobileMenuOpen"
            :links="navigationLinks"
            @link-clicked="isMobileMenuOpen = false"
        />
    </header>
</template>
