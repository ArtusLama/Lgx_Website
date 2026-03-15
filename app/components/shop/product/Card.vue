<script setup lang="ts">
import type { ClassValue } from "vue"

defineProps<{
    product: ShopProduct
}>()

const isExamplesOpen = ref(false)

function getProductTagColorClass(tag: ShopProduct["tag"] | undefined): ClassValue {
    switch (tag?.color) {
        case "muted":
            return "text-muted-foreground border-muted-foreground/25"
        case "primary":
        default:
            return "text-primary border-primary"
    }
}
</script>

<template>
    <div class="hover:scale-[1.02] hover:border-primary border-[1.5px] border-background-secondary/50 transition-all bg-background-secondary/20 rounded-lg px-6 py-4 shadow-xs flex flex-col gap-2">
        <div class="flex items-start justify-between gap-3">
            <h4 class="text-xl font-bold">
                {{ product.name }}
            </h4>
            <span
                v-if="product.tag && product.tag.enabled"
                class="shrink-0 text-sm font-semibold px-2 py-0.5 rounded border-[1.5px] tracking-tight"
                :class="getProductTagColorClass(product.tag)"
            >
                {{ product.tag.name }}
            </span>
        </div>
        <p>
            {{ product.description }}
        </p>

        <ul class="flex-1 list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li v-for="(item, index) in product.detailsList" :key="index">
                {{ item }}
            </li>
        </ul>

        <div class="mt-4 flex flex-col">
            <p class="text-xl font-semibold">
                {{ product.price }}
            </p>
            <p class="text-muted-foreground font-medium flex items-center gap-1">
                <Icon name="lucide:clock" />
                {{ product.deliveryTime }}
            </p>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
            <UiButton v-if="product.exampleImages" variant="outline" size="sm" @click="isExamplesOpen = true">
                <Icon name="lucide:eye" />
                View Examples
            </UiButton>
            <UiButton size="sm">
                <NuxtLink :to="product.shopUrl" target="_blank" external class="flex items-center gap-1">
                    <Icon name="lucide:shopping-cart" />
                    Buy Now
                </NuxtLink>
            </UiButton>
        </div>

        <UiDialog v-if="product.exampleImages" v-model:open="isExamplesOpen">
            <UiDialogContent class="shop-examples-dialog p-3 sm:p-4 max-w-200!">
                <UiDialogHeader>
                    <UiDialogTitle>{{ product.name }} - Examples</UiDialogTitle>
                </UiDialogHeader>

                <div class="mt-2">
                    <Suspense>
                        <div
                            v-if="product.exampleImages.length === 1"
                            class="shop-example-frame"
                        >
                            <LazyNuxtImg
                                :src="product.exampleImages[0]"
                                :alt="`${product.name} example image 1`"
                                class="h-full w-full object-contain select-none"
                                :draggable="false"
                            />
                        </div>

                        <LazyCarouselCarousel
                            v-else
                            :gap="12"
                            :items-to-show="1"
                            class="shop-examples-carousel rounded-xl overflow-hidden"
                        >
                            <CarouselSlide
                                v-for="(imagePath, index) in product.exampleImages"
                                :key="`${product.name}-example-${index}`"
                            >
                                <div class="shop-example-frame">
                                    <LazyNuxtImg
                                        class="h-full w-full object-contain select-none"
                                        :draggable="false"
                                        :src="imagePath"
                                        :alt="`${product.name} example image ${index + 1}`"
                                    />
                                </div>
                            </CarouselSlide>

                            <template #addons>
                                <CarouselNavigation />
                                <CarouselPagination />
                            </template>
                        </LazyCarouselCarousel>

                        <template #fallback>
                            <div class="w-full aspect-video rounded-xl bg-muted animate-pulse" />
                        </template>
                    </Suspense>
                </div>
            </UiDialogContent>
        </UiDialog>
    </div>
</template>

<style>
.shop-examples-carousel {
    --vc-nav-color: var(--color-muted-foreground);
    --vc-nav-color-hover: var(--color-foreground);
    --vc-pgn-background-color: var(--color-muted-foreground);
    --vc-pgn-active-color: var(--color-foreground);
    --vc-pgn-border-radius: 100rem;
    --vc-pgn-gap: 0.5rem;
    --vc-pgn-height: 0.4rem;
    --vc-pgn-width: 1rem;
}

.shop-examples-carousel .carousel__pagination-button {
    transition: width 0.3s ease-in-out;
    opacity: 0.5;
}

.shop-examples-carousel .carousel__pagination-button--active {
    width: 2rem !important;
}

.shop-example-frame {
    padding: 2rem;
}

.shop-example-frame img {
    border-radius: 0.5rem;
}
</style>
