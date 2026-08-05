<script setup lang="ts">
useSeoMeta({
    title: "Portfolio",
    description: "Browse my portfolio of Minecraft thumbnails, banners, and digital art. I'm Lgx_, a solo designer behind RaspocketStudios, making visuals for creators.",
})
</script>

<template>
    <div>
        <SectionPortfolioThumbnails />
        <SectionPortfolioProfilePictures />
        <SectionPortfolioBanners />

        <UiFullscreenImageView />
    </div>
</template>
