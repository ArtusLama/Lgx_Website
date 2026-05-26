<script setup lang="ts">
defineProps<{
    category: ShopCategory
    products: ShopProduct[]
    index: number
}>()
</script>

<template>
    <Section class="px-0! md:justify-start!">
        <h2 class="text-5xl font-bold font-jakarta italic">
            <span class="text-4xl text-primary font-black mr-2">
                {{ index + 1 }}.
            </span>
            {{ category.name }}:
        </h2>
        <ul class="ml-0 mt-8 gap-8 grid grid-cols-1 items-stretch sm:ml-12 lg:grid-cols-3 md:grid-cols-2">
            <li v-for="product in products" :key="product.title" class="h-full">
                <ShopProduct :product="product" />
            </li>
        </ul>
    </Section>
</template>
