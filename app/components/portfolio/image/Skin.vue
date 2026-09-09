<script setup lang="ts">
const { skin } = defineProps<{
    skin: Skin
}>()

const { open } = useImageViewer()

function openFullscreen() {
    open({
        images: [{
            src: skin.finalImage.src,
            alt: skin.finalImage.alt || "Minecraft skin",
        }],
        startIndex: 0,
    })
}
</script>

<template>
    <div
        role="button"
        tabindex="0"
        class="group rounded-lg bg-background w-full aspect-square cursor-pointer shadow-sm transition-all relative overflow-hidden focus-within:(shadow-md scale-103) hover:(shadow-md scale-103)"
        @pointerdown.prevent
        @click="openFullscreen"
    >
        <NuxtImg
            class="h-full w-full object-cover pointer-events-none select-none transition-transform duration-300 group-focus-within:scale-103 group-hover:scale-103"
            loading="lazy"
            :src="skin.finalImage.src"
            :alt="skin.finalImage.alt || 'Minecraft skin'"
        />
    </div>
</template>
