<script setup lang="ts">
const { thumbnail } = defineProps<{
    thumbnail: Thumbnail
}>()

const showBeforeVersion = ref(false)
const hasBeforeImageVersion = computed(() => !!thumbnail.beforeImage?.src) // TODO: Test this

const revealStyle = computed(() => ({
    clipPath: showBeforeVersion.value ? "circle(0% at 100% 0%)" : "circle(150% at 100% 0%)",
    filter: showBeforeVersion.value ? "blur(3px)" : "blur(0px)",
    transition: "clip-path 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms ease-out",
    willChange: "clip-path, filter",
}))

// TODO: image optimization with vercel and NuxtImg => placeholder, sizes, etc
</script>

<template>
    <div
        role="button"
        tabindex="0"
        class="group rounded-lg bg-background w-full cursor-pointer shadow-sm transition-all relative overflow-hidden focus-within:(shadow-md scale-103) hover:(shadow-md scale-103)"
        @pointerdown.prevent
    >
        <NuxtImg
            v-if="hasBeforeImageVersion"
            class="w-full pointer-events-none select-none left-0 top-0 absolute"
            loading="lazy"
            :src="thumbnail.beforeImage!.src"
            :alt="thumbnail.beforeImage!.alt"
        />
        <NuxtImg
            class="w-full pointer-events-none select-none transition-transform duration-300 group-focus-within:scale-103 group-hover:scale-103"
            loading="lazy"
            :src="thumbnail.finalImage.src"
            :alt="thumbnail.finalImage.alt"
            :style="revealStyle"
        />

        <UiButton
            v-if="hasBeforeImageVersion"
            icon
            size="small"
            variant="secondary"
            class="opacity-0 transition-opacity duration-300 right-2 top-2 absolute group-focus-within:opacity-100 group-hover:opacity-100"
            @click="showBeforeVersion = !showBeforeVersion"
        >
            <Icon :name="showBeforeVersion ? 'lucide:eye' : 'lucide:eye-off'" />
            {{ showBeforeVersion ? "Show After" : "Show Before" }}
        </UiButton>
    </div>
</template>
