<script setup lang="ts">
const { data: thumbnails } = await useAsyncData("thumbnails", () => queryCollection("showcaseThumbnails").all())

const { gsap } = useGsap()
const galleryRef = ref<HTMLElement | null>(null)
const isPreviewOpen = ref(false)
const activeIndex = ref(0)

let cleanupHoverListeners: (() => void) | null = null
let gsapContext: gsap.Context | null = null

const activeImage = computed(() => {
    const thumbnail = thumbnails.value?.[activeIndex.value]
    return thumbnail ? thumbnail.imageUrl : ""
})

function openPreview(index: number) {
    activeIndex.value = index
    isPreviewOpen.value = true
}

onMounted(() => {
    if (!galleryRef.value) {
        return
    }

    gsapContext = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>(".gallery-thumbnail-item")

        items.forEach((item) => {
            const resolveImages = () => Array.from(item.querySelectorAll<HTMLImageElement>("img"))

            const ensureImagesPrepared = (imageElements: HTMLImageElement[]) => {
                imageElements.forEach((imageElement) => {
                    if (imageElement.dataset.gsapPrepared === "true") {
                        return
                    }

                    gsap.set(imageElement, {
                        filter: "brightness(1) contrast(1) saturate(1)",
                        willChange: "transform, filter",
                    })

                    imageElement.dataset.gsapPrepared = "true"
                })
            }

            gsap.set(item, {
                "transformPerspective": 900,
                "transformOrigin": "center center",
                "--thumb-shadow-alpha": 0,
                "boxShadow": "0 10px 24px rgba(0, 0, 0, var(--thumb-shadow-alpha))",
                "willChange": "transform, box-shadow",
            })

            ensureImagesPrepared(resolveImages())

            gsap.fromTo(
                item,
                {
                    autoAlpha: 0,
                    y: 22,
                    scale: 0.985,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.25,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                },
            )

            const handleMouseMove = (event: MouseEvent) => {
                const images = resolveImages()
                ensureImagesPrepared(images)

                const rect = item.getBoundingClientRect()
                const xPercent = (event.clientX - rect.left) / rect.width - 0.5
                const yPercent = (event.clientY - rect.top) / rect.height - 0.5
                const shine = Math.min(1.16, 1.06 + (Math.abs(xPercent) + Math.abs(yPercent)) * 0.08)

                gsap.to(item, {
                    rotateY: xPercent * 6,
                    rotateX: yPercent * -6,
                    scale: 1.005,
                    duration: 0.22,
                    ease: "power2.out",
                    overwrite: "auto",
                })

                gsap.to(images, {
                    scale: 1.02,
                    filter: `brightness(${shine}) contrast(1.05) saturate(1.08)`,
                    duration: 0.25,
                    ease: "power2.out",
                    overwrite: "auto",
                })
            }

            const handleMouseEnter = () => {
                ensureImagesPrepared(resolveImages())
                gsap.killTweensOf(item, "--thumb-shadow-alpha")

                gsap.to(item, {
                    "--thumb-shadow-alpha": 0.18,
                    "duration": 0.3,
                    "ease": "power2.out",
                })
            }

            const handleMouseLeave = () => {
                const images = resolveImages()
                ensureImagesPrepared(images)

                gsap.killTweensOf(item, "rotateX,rotateY,scale")

                gsap.to(item, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: "power2.out",
                    overwrite: "auto",
                })

                gsap.to(item, {
                    "--thumb-shadow-alpha": 0,
                    "duration": 0.65,
                    "ease": "power1.out",
                    "overwrite": "auto",
                })

                gsap.killTweensOf(images, "scale,filter")

                gsap.to(images, {
                    scale: 1,
                    filter: "brightness(1) contrast(1) saturate(1)",
                    duration: 0.45,
                    ease: "power2.out",
                    overwrite: "auto",
                })
            }

            item.addEventListener("mouseenter", handleMouseEnter)
            item.addEventListener("mousemove", handleMouseMove)
            item.addEventListener("mouseleave", handleMouseLeave)

            const existingCleanup = cleanupHoverListeners
            cleanupHoverListeners = () => {
                existingCleanup?.()
                item.removeEventListener("mouseenter", handleMouseEnter)
                item.removeEventListener("mousemove", handleMouseMove)
                item.removeEventListener("mouseleave", handleMouseLeave)
            }
        })
    }, galleryRef.value)
})

onBeforeUnmount(() => {
    cleanupHoverListeners?.()
    cleanupHoverListeners = null
    gsapContext?.revert()
    gsapContext = null
})
</script>

<template>
    <Section name="thumbnail-gallery">
        <div ref="galleryRef">
            <div class="flex flex-col items-center text-center">
                <p class="text-4xl font-bold">
                    Portfolio
                </p>
                <p class="text-6xl font-bold text-primary">
                    Thumbnail Gallery
                </p>
            </div>

            <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-12">
                <SectionGalleryThumbnailItem
                    v-for="(thumbnail, index) in thumbnails"
                    :key="index"
                    class="gallery-thumbnail-item"
                    :thumbnail="thumbnail.imageUrl"
                    :unedited-tumbnail="thumbnail.beforeImageUrl"
                    :short-description="thumbnail.shortDescription"
                    @preview="openPreview(index)"
                />
            </div>

            <UiDialog v-model:open="isPreviewOpen">
                <UiDialogContent class="bg-transparent p-0 border-0 flex min-w-fit max-w-300!">
                    <NuxtImg
                        :src="activeImage"
                        alt="Gallery preview image"
                        class="block rounded-md object-contain w-full"
                    />
                </UiDialogContent>
            </UiDialog>
        </div>

        <div class="mt-10 w-full flex items-center">
            <UiButton
                size="lg"
                as-child
                class="mx-auto"
            >
                <NuxtLink to="/portfolio">
                    <Icon name="lucide:sparkles" />
                    View More
                </NuxtLink>
            </UiButton>
        </div>
    </Section>
</template>
