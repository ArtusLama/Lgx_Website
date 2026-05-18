<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
} from "reka-ui"

const { isOpen, images, activeIndex, close } = useImageViewer()
const hasImages = computed(() => images.value.length > 0)
const isGallery = computed(() => images.value.length > 1)
const currentImage = computed(() => images.value[activeIndex.value] ?? images.value[0] ?? null)

onMounted(() => {
    const scrollLock = useScrollLock(document.documentElement, isOpen.value)
    syncRef(isOpen, scrollLock)
})
watch(isOpen, newVal => document.body.toggleAttribute("data-lenis-prevent", newVal))
</script>

<template>
    <DialogRoot v-model:open="isOpen" modal>
        <DialogPortal>
            <DialogOverlay
                class="bg-black/80 inset-0 fixed z-40 backdrop-blur-sm"
            />
            <DialogContent
                class="p-6 outline-none flex flex-col items-center inset-0 justify-center fixed z-55 lg:p-16 sm:p-10"
                @click="close"
            >
                <DialogClose
                    class="text-white mt-6 p-1.5 rounded-md flex size-12 transition-colors items-center right-6 top-[var(--spacing-navbar-height)] justify-center absolute z-50 hover:bg-white/20"
                    aria-label="Close"
                >
                    <Icon name="lucide:x" :size="32" />
                </DialogClose>

                <div class="flex h-full w-full items-center justify-center">
                    <LazyCarouselCarousel
                        v-if="isGallery"
                        v-model="activeIndex"
                        :gap="12"
                        :items-to-show="1"
                        class="shop-examples-carousel text-white rounded-xl h-fit max-w-6xl w-full [--vc-nav-color-hover:#ffffff] [--vc-nav-color:rgba(255,255,255,0.7)] [--vc-pgn-active-color:#ffffff] [--vc-pgn-background-color:rgba(255,255,255,0.45)] [--vc-pgn-border-radius:999px] [--vc-pgn-gap:0.5rem] [--vc-pgn-height:0.4rem] [--vc-pgn-width:1rem] overflow-hidden"
                        @click.stop
                    >
                        <CarouselSlide
                            v-for="(item, index) in images"
                            :key="`${item.src}-${index}`"
                            class="h-full"
                        >
                            <div class="p-6 flex h-full w-full items-center justify-center lg:p-12 sm:p-10">
                                <NuxtImg
                                    :src="item.src"
                                    :alt="item.alt || `Fullscreen image ${index + 1}`"
                                    loading="lazy"
                                    class="rounded-lg h-auto max-h-full max-w-full w-auto select-none object-contain"
                                    :draggable="false"
                                    @click.stop
                                />
                            </div>
                        </CarouselSlide>

                        <template #addons>
                            <CarouselNavigation />
                            <CarouselPagination />
                        </template>
                    </LazyCarouselCarousel>

                    <NuxtImg
                        v-else-if="hasImages"
                        :src="currentImage?.src || ''"
                        :alt="currentImage?.alt || 'Fullscreen image'"
                        loading="lazy"
                        class="rounded-lg h-auto max-h-full max-w-full w-auto select-none object-contain"
                        :draggable="false"
                        @click.stop
                    />
                </div>

                <slot />
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped>
.shop-examples-carousel :deep(.carousel__pagination-button) {
    @apply transition-all duration-300 opacity-50;
}

.shop-examples-carousel :deep(.carousel__pagination-button--active) {
    @apply w-8 opacity-100;
}
</style>
