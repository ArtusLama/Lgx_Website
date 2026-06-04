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

const allVariants = computed(() => [thumbnail.finalImage, ...thumbnail.finalImageVariants])
const {
    state: currentThumbnail,
    next: nextVariant,
} = useCycleList(allVariants)

const { open } = useImageViewer()

function openFullscreen() {
    if (showBeforeVersion.value && thumbnail.beforeImage?.src) {
        open({
            images: [{ src: thumbnail.beforeImage.src, alt: thumbnail.beforeImage.alt }],
            startIndex: 0,
        })
        return
    }

    open({
        images: [{
            src: currentThumbnail.value?.src || "",
            alt: currentThumbnail.value?.alt || "Thumbnail image",
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
        class="group rounded-lg bg-background w-full aspect-video cursor-pointer shadow-sm transition-all relative overflow-hidden focus-within:(shadow-md scale-103) hover:(shadow-md scale-103)"
        @pointerdown.prevent
        @click="openFullscreen"
    >
        <NuxtImg
            v-if="hasBeforeImageVersion"
            class="w-full pointer-events-none select-none transition-transform duration-300 left-0 top-0 absolute group-focus-within:scale-103 group-hover:scale-103"
            loading="lazy"
            :src="thumbnail.beforeImage!.src"
            :alt="thumbnail.beforeImage?.alt || 'Before Thumbnail image'"
        />
        <div
            class="w-full"
            :style="revealStyle"
        >
            <NuxtImg
                class="w-full pointer-events-none select-none transition-transform duration-300 group-focus-within:scale-103 group-hover:scale-103"
                loading="lazy"
                :src="currentThumbnail.src || ''"
                :alt="currentThumbnail.alt || 'Thumbnail image'"
            />
        </div>

        <div class="opacity-0 flex flex-col gap-2 transition-opacity duration-300 items-end right-2 top-2 absolute group-focus-within:opacity-100 group-hover:opacity-100 *:w-fit">
            <UiButton
                v-if="hasBeforeImageVersion"
                icon
                size="small"
                variant="secondary"
                class="relative overflow-visible before:rounded-md before:content-[''] before:absolute before:-inset-3"
                @click.stop="showBeforeVersion = !showBeforeVersion"
            >
                <Icon :name="showBeforeVersion ? 'lucide:eye' : 'lucide:eye-off'" />
                {{ showBeforeVersion ? "Show After" : "Show Before" }}
            </UiButton>
            <UiButton
                v-if="allVariants.length > 1"
                icon
                size="small"
                variant="secondary"
                class="relative overflow-visible before:rounded-md before:content-[''] before:absolute before:-inset-1"
                :disabled="showBeforeVersion"
                @click.stop="nextVariant()"
            >
                <Icon name="lucide:arrow-left-right" />
                Next Variant
            </UiButton>
        </div>
    </div>
</template>
