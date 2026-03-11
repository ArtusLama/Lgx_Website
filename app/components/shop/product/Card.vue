<script setup lang="ts">
import type { ClassValue } from "vue"

defineProps<{
    product: Product
}>()

const isExamplesOpen = ref(false)

function getProductTagColorClass(color: ProductTagColor | undefined): ClassValue {
    switch (color) {
        case "muted":
            return "text-muted-foreground border-muted-foreground/25"
        case "destructive":
            return "text-destructive border-destructive"
        case "primary":
        default:
            return "text-primary border-primary"
    }
}
</script>

<template>
    <div class="hover:scale-105 hover:border-primary border-[1.5px] border-background-secondary/50 transition-all bg-background-secondary/20 rounded-lg px-6 py-4 shadow-xs flex flex-col gap-2">
        <div class="flex items-start justify-between gap-3">
            <h4 class="text-xl font-bold">
                {{ product.name }}
            </h4>
            <span
                v-if="product.tag"
                class="shrink-0 text-sm font-semibold px-2 py-0.5 rounded border-[1.5px] tracking-tight"
                :class="getProductTagColorClass(product.tagColor)"
            >
                {{ product.tag }}
            </span>
        </div>
        <p>
            {{ product.description }}
        </p>

        <ul v-if="product.descriptionList" class="flex-1 list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li v-for="(item, index) in product.descriptionList" :key="index">
                {{ item }}
            </li>
        </ul>

        <div class="mt-4 flex flex-col">
            <p class="text-xl font-semibold">
                ${{ product.price.toFixed(2) }}
            </p>
            <p class="text-muted-foreground font-medium flex items-center gap-1">
                <Icon name="lucide:clock" />
                1-7 days delivery
            </p>
        </div>

        <div class="mt-4 space-x-2">
            <UiButton variant="outline" size="sm" @click="isExamplesOpen = true">
                <Icon name="lucide:eye" />
                View Examples
            </UiButton>
            <UiButton size="sm">
                <Icon name="lucide:shopping-cart" />
                Buy Now
            </UiButton>
        </div>

        <UiDialog v-model:open="isExamplesOpen">
            <UiDialogContent class="shop-examples-dialog p-3 sm:p-4 max-w-200!">
                <UiDialogHeader>
                    <UiDialogTitle>{{ product.name }} Examples</UiDialogTitle>
                    <UiDialogDescription>
                        Sample previews for this product.
                    </UiDialogDescription>
                </UiDialogHeader>

                <div class="mt-2">
                    <NuxtImg
                        v-if="product.images.length === 1"
                        :src="product.images[0]"
                        :alt="`${product.name} example image 1`"
                        class="w-full rounded-xl aspect-video object-cover select-none"
                        :draggable="false"
                    />

                    <CarouselCarousel
                        v-else
                        :gap="12"
                        :items-to-show="1"
                        class="shop-examples-carousel rounded-xl overflow-hidden"
                    >
                        <CarouselSlide
                            v-for="(imagePath, index) in product.images"
                            :key="`${product.id}-example-${index}`"
                        >
                            <NuxtImg
                                class="w-full rounded-xl aspect-video object-cover select-none"
                                :draggable="false"
                                :src="imagePath"
                                :alt="`${product.name} example image ${index + 1}`"
                            />
                        </CarouselSlide>

                        <template #addons>
                            <CarouselNavigation />
                            <CarouselPagination />
                        </template>
                    </CarouselCarousel>
                </div>
            </UiDialogContent>
        </UiDialog>
    </div>
</template>

<style scoped>
.shop-examples-dialog {
    --vc-nav-color: var(--color-muted-foreground);
    --vc-nav-color-hover: var(--color-foreground);
    --vc-pgn-background-color: var(--color-muted-foreground);
    --vc-pgn-active-color: var(--color-foreground);
    --vc-pgn-border-radius: 100rem;
    --vc-pgn-gap: 0.5rem;
    --vc-pgn-height: 0.4rem;
    --vc-pgn-width: 1rem;
}

.shop-examples-carousel :deep(.carousel__pagination-button) {
    transition: width 0.3s ease-in-out;
    opacity: 0.5;
}

.shop-examples-carousel :deep(.carousel__pagination-button--active) {
    width: 2rem !important;
}
</style>
