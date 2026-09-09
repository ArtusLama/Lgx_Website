<script setup lang="ts">
const { pending, error, data: skins } = useLazyAsyncData("portfolio-skins", () => queryCollection("portfolioSkins").all())
</script>

<template>
    <div v-if="!pending && !error && skins" class="gap-8 grid grid-cols-1 xl:gap-12 md:grid-cols-3 xl:grid-cols-4">
        <PortfolioImageSkin v-for="skin in skins" :key="skin.id" :skin="skin" />
    </div>
    <div v-else-if="pending" />
    <div v-else>
        <p>Error loading skins.</p>
    </div>
</template>
