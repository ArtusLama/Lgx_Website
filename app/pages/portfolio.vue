<script setup lang="ts">
useSeoMeta({
    title: "Portfolio",
    description: "Browse my portfolio of Minecraft thumbnails, pixel art, and digital art. I'm Lgx_, a solo designer behind RaspocketStudios, making visuals for creators.",
})
</script>

<template>
    <div>
        <SectionPortfolioThumbnails />
        <SectionPortfolioProfilePictures />
        <SectionPortfolioPixelArt />

        <UiFullscreenImageView />
    </div>
</template>
