<script setup lang="ts">
const tempGalleryImages = [
    {
        original: "https://media.discordapp.net/attachments/1082408224856211526/1478446424591962183/v2.png?ex=69a86e07&is=69a71c87&hm=b1d5f0dcd61195d1fa689f05fd50233a305cc821d7bef7db129b5d9864852a29&=&format=webp&quality=lossless&width=1421&height=800",
        unedited: "https://i.ibb.co/jk6sXXq9/image.png",
    },
    {
        original: "https://media.discordapp.net/attachments/1082408224856211526/1478446425200263269/Prestige_vs_Voil.png?ex=69a86e07&is=69a71c87&hm=632ead4836f00297c999892e0ef3df4325b0872fc21746df6eef9da7a63c4a72&=&format=webp&quality=lossless&width=1421&height=800",
    },
    {
        original: "https://media.discordapp.net/attachments/1082408224856211526/1478446425816957000/RigedTournament.png?ex=69a86e08&is=69a71c88&hm=049b1d180cd64b2da5ccd1d0e10ec470ec7db96d83f87c3759eab8abed9467c4&=&format=webp&quality=lossless&width=1421&height=800",
    },
    {
        original: "https://media.discordapp.net/attachments/1082408224856211526/1478446426273878159/Modernlegendslp.png?ex=69a86e08&is=69a71c88&hm=571b7cef707af56454d1c58fd216016013ebeeccb90f4bf04e848b45cbe21371&=&format=webp&quality=lossless&width=1421&height=800",
    },
    {
        original: "https://media.discordapp.net/attachments/1082408224856211526/1478446436793454844/Best_16x_Packs.png?ex=69a86e0a&is=69a71c8a&hm=76f5b78d28e901e89b6f0c66702914067a9b3133755db867accfe630f171d8b9&=&format=webp&quality=lossless&width=1421&height=800",
    },
]

const { gsap } = useGsap()
const galleryRef = ref<HTMLElement | null>(null)
const isPreviewOpen = ref(false)
const activeIndex = ref(0)

let cleanupHoverListeners: (() => void) | null = null
let gsapContext: gsap.Context | null = null

const activeImage = computed(() => tempGalleryImages[activeIndex.value]?.original ?? "")

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
                    v-for="(thumbnail, index) in tempGalleryImages"
                    :key="index"
                    class="gallery-thumbnail-item"
                    :thumbnail="thumbnail.original"
                    :unedited-tumbnail="thumbnail.unedited"
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
    </Section>
</template>
