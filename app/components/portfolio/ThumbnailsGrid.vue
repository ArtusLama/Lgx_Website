<script setup lang="ts">
const { pending, error, data: thumbnails } = useLazyAsyncData("portfolio-thumbnails", () => queryCollection("portfolioThumbnails").all())
</script>

<template>
    <div v-if="!pending && !error && thumbnails" class="gap-8 grid grid-cols-1 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
        <PortfolioImageThumbnail v-for="thumbnail in thumbnails" :key="thumbnail.stem" :thumbnail="thumbnail" />
    </div>
    <div
        v-else-if="pending"
        class="flex h-64 items-center justify-center"
    >
        <p>Loading thumbnails...</p>
    </div>
    <div v-else>
        <p>Error loading thumbnails.</p>
    </div>
</template>
