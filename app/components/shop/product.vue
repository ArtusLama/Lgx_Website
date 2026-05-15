<script setup lang="ts">
defineProps<{
    product: ShopProduct
}>()
</script>

<template>
    <div class="p-4 border border-gray-300 rounded">
        <h3 class="text-xl font-semibold mb-2">
            {{ product.name }}
        </h3>
        <p>{{ product.description }}</p>
    </div>
</template>
