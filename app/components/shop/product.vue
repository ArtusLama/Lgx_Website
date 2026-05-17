<script setup lang="ts">
defineProps<{
    product: ShopProduct
}>()

const card = useTemplateRef<HTMLDivElement>("card")
const title = useTemplateRef<HTMLHeadingElement>("title")

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
</script>

<template>
    <div ref="card" class="group p-4 border border-foreground/50 rounded-xl shadow-sm transition-all hover:(border-primary shadow-md translate-y-[-2px])">
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

        <div class="text-sm mt-3 flex flex-wrap gap-x-3 gap-y-1 items-center">
            <span class="text-primary font-semibold">{{ product.price }}</span>
            <span v-if="product.deliveryTime" class="text-foreground/70">
                Delivery: {{ product.deliveryTime }}
            </span>
        </div>

        <ul v-if="product.informationList?.length" class="text-sm text-foreground/80 mt-4 list-disc list-inside space-y-1">
            <li v-for="item in product.informationList ?? []" :key="item">
                {{ item }}
            </li>
        </ul>

        <div v-if="product.examples?.length" class="mt-4 gap-2 grid grid-cols-3">
            <NuxtImg
                v-for="src in product.examples ?? []"
                :key="src"
                :src="src"
                :alt="product.title"
                class="rounded-md h-20 w-full object-cover"
                loading="lazy"
            />
        </div>

        <div v-if="product.buyLink" class="mt-4">
            <Button
                as="a"
                :href="product.buyLink?.url"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
            >
                {{ product.buyLink?.label }}
            </Button>
        </div>
    </div>
</template>
