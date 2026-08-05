<script setup lang="ts">
const { pending, error, data: banners } = useLazyAsyncData("portfolio-banners", () => queryCollection("portfolioBanners").all())
</script>

<template>
    <!-- TODO: on first page load pfps very tiny! -->
    <div v-if="!pending && !error && banners" class="gap-8 grid grid-cols-1 xl:gap-12 xl:grid-cols-2">
        <PortfolioImageBanner v-for="banner in banners" :key="banner.id" :banner="banner" />
    </div>
    <div v-else-if="pending" />
    <div v-else>
        <p>Error loading banners.</p>
    </div>
</template>
