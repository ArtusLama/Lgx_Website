<script setup lang="ts">
const isDesktop = useMediaQuery("(min-width: 900px)")

const navigationLinks = [
    { label: "Home", to: "/" },
    { label: "Portfolio", to: "/#thumbnail-gallery", scrollToTarget: true },
    { label: "YouTube", to: "https://www.youtube.com/@Lgx__", external: true },
    { label: "Discord", to: "https://discord.gg/XJe4JHkQgz", external: true },
]
</script>

<template>
    <NavigationDesktopNavigation
        v-if="isDesktop"
        :links="navigationLinks"
    />
    <NavigationMobileNavigation
        v-else
        :links="navigationLinks"
    />
</template>
