<script setup lang="ts">
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
    <div ref="card" class="group p-4 border border-foreground/50 rounded-xl flex flex-col h-full shadow-sm transition-all justify-between hover:(border-primary shadow-md translate-y-[-2px])">
        <div>
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
                <p>
                    <span>PRICE:</span>
                    <span class="font-bold ml-2">
                        {{ product.price }}
                    </span>
                </p>
                <p>
                    <Icon name="lucide:clock" />
                    <span class="ml-2">
                        {{ product.deliveryTime }}
                    </span>
                </p>
            </div>

            <ul v-if="product.informationList?.length" class="text-sm text-foreground/80 mt-4 list-disc list-inside space-y-1">
                <li v-for="item in product.informationList ?? []" :key="item">
                    {{ item }}
                </li>
            </ul>
        </div>

        <div v-if="product.buyLink" class="mt-8 p-2 flex flex-wrap gap-2">
            <UiButton v-if="hasExamples" icon variant="outline" @click="openExamples">
                <Icon name="lucide:eye" class="mt-1" />
                Show Examples
            </UiButton>
            <UiButton as-child icon>
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
    </div>
</template>
