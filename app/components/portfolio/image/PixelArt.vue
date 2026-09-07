<script setup lang="ts">
const { pixelArt } = defineProps<{
    pixelArt: PixelArt
}>()

const { open } = useImageViewer()

function openFullscreen() {
    open({
        images: [{
            src: pixelArt.finalImage.src,
            alt: pixelArt.finalImage.alt || "Pixel art image",
        }],
        startIndex: 0,
    })
}

onMounted(() => {
    // const { gsap } = useGsap()
})

// TODO: image optimization with vercel and NuxtImg => placeholder, sizes, etc
</script>

<template>
    <div
        role="button"
        tabindex="0"
        class="pixel-art-item"
        @pointerdown.prevent
        @click="openFullscreen"
    >
        <NuxtImg
            class="pixel-art-image"
            loading="lazy"
            :src="pixelArt.finalImage.src"
            :alt="pixelArt.finalImage.alt || 'Pixel art image'"
        />
    </div>
</template>

<style scoped>
.pixel-art-item {
    display: flex;
    min-height: 8rem;
    width: 100%;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: transform 300ms ease;
}

.pixel-art-item:hover {
    transform: scale(1.05);
}

.pixel-art-image {
    width: auto;
    max-width: 100%;
    max-height: 14rem;
    pointer-events: none;
    user-select: none;
    image-rendering: pixelated;
}

div[role="button"]:focus-visible {
    outline: 2px solid var(--un-color-primary);
    outline-offset: 4px;
}
</style>
