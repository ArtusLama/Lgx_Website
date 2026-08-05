<script setup lang="ts">
const { banner } = defineProps<{
    banner: Banner
}>()

const showBeforeVersion = ref(false)
const hasBeforeImageVersion = computed(() => !!banner.beforeImage?.src) // TODO: Test this

const revealStyle = computed(() => ({
    clipPath: showBeforeVersion.value ? "circle(0% at 100% 0%)" : "circle(150% at 100% 0%)",
    filter: showBeforeVersion.value ? "blur(3px)" : "blur(0px)",
    transition: "clip-path 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms ease-out",
    willChange: "clip-path, filter",
}))

const currentBanner = computed(() => {
    if (showBeforeVersion.value && banner.beforeImage?.src) {
        return banner.beforeImage
    }

    return banner.finalImage
})

const { open } = useImageViewer()

function openFullscreen() {
    if (showBeforeVersion.value && banner.beforeImage?.src) {
        open({
            images: [{ src: banner.beforeImage.src, alt: banner.beforeImage.alt }],
            startIndex: 0,
        })
        return
    }

    open({
        images: [{
            src: currentBanner.value?.src || "",
            alt: currentBanner.value?.alt || "Banner image",
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
        class="group rounded-lg bg-background h-fit w-full cursor-pointer shadow-sm transition-all relative overflow-hidden focus-within:(shadow-md scale-103) hover:(shadow-md scale-103)"
        @pointerdown.prevent
        @click="openFullscreen"
    >
        <NuxtImg
            v-if="hasBeforeImageVersion"
            class="w-full pointer-events-none select-none transition-transform duration-300 left-0 top-0 absolute group-focus-within:scale-103 group-hover:scale-103"
            loading="lazy"
            :src="banner.beforeImage!.src"
            :alt="banner.beforeImage?.alt || 'Before Banner image'"
        />
        <div
            class="w-full"
            :style="revealStyle"
        >
            <NuxtImg
                class="w-full pointer-events-none select-none transition-transform duration-300 group-focus-within:scale-103 group-hover:scale-103"
                loading="lazy"
                :src="banner.finalImage?.src || ''"
                :alt="banner.finalImage?.alt || 'Final Banner image'"
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
        </div>
    </div>
</template>
