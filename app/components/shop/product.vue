<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
} from "reka-ui"

const { product } = defineProps<{
    product: ShopProduct
}>()

const card = useTemplateRef<HTMLDivElement>("card")
const title = useTemplateRef<HTMLHeadingElement>("title")
const { open } = useImageViewer()

const exampleImages = computed(() => (product.examples ?? []).map((src, index) => ({
    src,
    alt: `${product.title} example image ${index + 1}`,
})))
const hasExamples = computed(() => exampleImages.value.length > 0)
const hasContactDialog = computed(() => !!product.contactDialog && !!product.contactDialog.title && !!product.contactDialog.description)
const hasBuyLink = computed(() => !!product.buyLink && !!product.buyLink.url && !!product.buyLink.label)
const hasActionButtons = computed(() => hasExamples.value || hasBuyLink.value || hasContactDialog.value)
const isContactOpen = ref(false)

onMounted(() => {
    // const { gsap, SplitText } = useGsap()

    // nothing for now
})

function tagClass(color: "primary" | "secondary" | "muted") {
    switch (color) {
        case "primary":
            return "bg-primary text-white"
        case "secondary":
            return "bg-secondary text-white"
        case "muted":
            return "bg-foreground/10 text-foreground"
        default:
            return "bg-foreground/10 text-foreground"
    }
}

function openExamples() {
    if (!hasExamples.value)
        return

    open({
        images: exampleImages.value,
        startIndex: 0,
    })
}
</script>

<template>
    <div ref="card" class="group px-8 py-4 border border-foreground/50 rounded-xl flex flex-col h-full shadow-sm transition-all justify-between hover:(border-primary shadow-md translate-y-[-2px])">
        <div class="space-y-4">
            <div class="flex gap-4 items-start justify-between">
                <h3 ref="title" class="text-3xl font-bold font-jakarta">
                    {{ product.title }}
                </h3>
                <span
                    v-if="product.tag"
                    class="text-xs tracking-wide font-bold px-2.5 py-1 rounded-full shrink-0 uppercase"
                    :class="tagClass(product.tag.color)"
                >
                    {{ product.tag.label }}
                </span>
            </div>
            <p class="text-foreground/80 mt-2">
                {{ product.shortDescription }}
            </p>

            <div>
                <p class="text-2xl font-bold">
                    {{ product.price }}
                </p>
                <p class="text-lg text-foreground/80 flex gap-1.5 items-center">
                    <Icon name="lucide:clock" class="mt-0.5" />
                    <span>
                        {{ product.deliveryTime }}
                    </span>
                </p>
            </div>

            <ul v-if="product.informationList?.length" class="text-foreground/80 mt-4 list-disc list-inside space-y-1">
                <li v-for="item in product.informationList ?? []" :key="item">
                    {{ item }}
                </li>
            </ul>
        </div>

        <div v-if="hasActionButtons" class="mt-8 p-2 flex flex-wrap gap-2">
            <UiButton v-if="hasExamples" icon variant="outline" @click="openExamples">
                <Icon name="lucide:eye" class="mt-1" />
                Show Examples
            </UiButton>
            <UiButton v-if="hasContactDialog" icon @click="isContactOpen = true">
                <Icon name="lucide:info" />
                How to Order
            </UiButton>
            <UiButton v-if="hasBuyLink" as-child icon>
                <NuxtLink
                    external
                    target="_blank"
                    :to="product.buyLink?.url"
                >
                    <Icon name="lucide:shopping-cart" />
                    {{ product.buyLink?.label }}
                </NuxtLink>
            </UiButton>
        </div>

        <DialogRoot v-if="hasContactDialog" v-model:open="isContactOpen" modal>
            <DialogPortal>
                <DialogOverlay class="bg-black/60 inset-0 fixed z-40 backdrop-blur-sm" />
                <DialogContent
                    class="text-foreground p-6 outline-none rounded-xl bg-background max-w-xl w-[calc(100%-2rem)] shadow-xl left-1/2 top-1/2 fixed z-50 sm:p-8 -translate-x-1/2 -translate-y-1/2"
                >
                    <DialogClose
                        class="leading-none rounded-md flex size-9 transition-colors items-center right-3 top-3 justify-center absolute hover:bg-foreground/10"
                        aria-label="Close"
                    >
                        <Icon name="lucide:x" :size="20" class="block" />
                    </DialogClose>

                    <div class="space-y-4">
                        <h4 class="text-2xl font-bold font-jakarta">
                            {{ product.contactDialog?.title }}
                        </h4>
                        <p class="text-foreground/80 whitespace-pre-line">
                            {{ product.contactDialog?.description }}
                        </p>
                        <div v-if="product.contactDialog?.link" class="pt-2 w-fit">
                            <UiButton as-child icon>
                                <NuxtLink
                                    external
                                    target="_blank"
                                    :to="product.contactDialog?.link?.url"
                                >
                                    <Icon name="lucide:external-link" />
                                    {{ product.contactDialog?.link?.label }}
                                </NuxtLink>
                            </UiButton>
                        </div>
                    </div>
                </DialogContent>
            </DialogPortal>
        </DialogRoot>
    </div>
</template>
