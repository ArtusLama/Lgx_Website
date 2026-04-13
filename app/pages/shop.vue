<script setup lang="ts">
useSeoMeta({
    title: "Shop",
    description: "Explore my shop including design resources and commissions for thumbnails, profile pictures, banners, and more. Check out my products and services to enhance your online presence with custom designs.",
})
</script>

<template>
    <div class="space-y-12 mt-24">
        <TitleElement
            tinytitle="My Store"
            title="Check out my products"
            align="left"
        />

        <ShopProducts />
    </div>
</template>
