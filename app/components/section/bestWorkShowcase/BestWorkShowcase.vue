<script setup lang="ts">
const { data: topThumbnails } = useLazyAsyncData("top-4-portfolio-thumbnails", () => queryCollection("portfolioThumbnails").limit(4).all())
</script>

<template>
    <Section>
        <div class="flex flex-col gap-12 items-center">
            <UiFullscreenImageView />
            <div class="gap-6 grid grid-cols-1 relative z-20 sm:grid-cols-2">
                <PortfolioImageThumbnail v-for="thumbnail in topThumbnails" :key="thumbnail.stem" :thumbnail="thumbnail" />
            </div>
            <div>
                <UiButton icon as-child>
                    <NuxtLink to="/portfolio">
                        <Icon name="lucide:arrow-right" />
                        View Full Portfolio
                    </NuxtLink>
                </UiButton>
            </div>
        </div>
    </Section>
</template>
