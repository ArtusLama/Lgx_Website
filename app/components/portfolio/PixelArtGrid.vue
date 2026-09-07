<script setup lang="ts">
const { pending, error, data: pixelArt } = useLazyAsyncData("portfolio-pixel-art", () => queryCollection("portfolioPixelArt").all())
</script>

<template>
    <div v-if="!pending && !error && pixelArt" class="gap-12 grid grid-cols-3 lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 xl:grid-cols-10">
        <PortfolioImagePixelArt v-for="pixelArtItem in pixelArt" :key="pixelArtItem.id" :pixel-art="pixelArtItem" />
    </div>
    <div v-else-if="pending" />
    <div v-else>
        <p>Error loading pixel art.</p>
    </div>
</template>
