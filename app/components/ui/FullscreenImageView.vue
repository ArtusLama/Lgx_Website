<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
} from "reka-ui"

const { isOpen, image, close } = useImageViewer()
const hasImage = computed(() => !!image.value?.src)

onMounted(() => {
    const scrollLock = useScrollLock(document.documentElement, isOpen.value)
    syncRef(isOpen, scrollLock)
})
watch(isOpen, newVal => document.body.toggleAttribute("data-lenis-prevent", newVal))
</script>

<template>
    <DialogRoot v-model:open="isOpen" modal>
        <DialogPortal>
            <DialogOverlay class="bg-black/80 inset-0 fixed z-40 backdrop-blur-sm" />
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
                    <NuxtImg
                        v-if="hasImage"
                        :src="image?.src || ''"
                        :alt="image?.alt || 'Fullscreen image'"
                        class="rounded-lg h-auto max-h-full max-w-full w-auto object-contain"
                        @click.stop
                    />
                </div>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>
