<script setup lang="ts">
defineProps<{
    category: ShopCategory
    products: ShopProduct[]
}>()
</script>

<template>
    <section>
        <h2>{{ category.name }}</h2>
        <ul>
            <li v-for="product in products" :key="product.stem">
                <ShopProduct :product="product" />
            </li>
        </ul>
    </section>
</template>
