<script setup lang="ts">
const { data: shopProducts } = await useAsyncData("shop-products", () => queryCollection("shopProducts").all())
const { data: shopCategories } = await useAsyncData("shop-categories", () => queryCollection("shopCategories").all())

function stemToCategory(stem: string) {
    // Remove from right until slash or backslash and use as result the text from there until the next slash or backslash (on the left)
    const match = stem.match(/([^\\/]+)[\\/][^\\/]*$/)
    return match ? match[1] : stem
}

const groupedProducts = computed(() => {
    if (!shopProducts.value || !shopCategories.value)
        return []

    const grouped = shopCategories.value.map(category => ({
        category,
        products: [] as ShopProduct[],
    }))

    shopProducts.value.forEach((product) => {
        const category = grouped.find(c => stemToCategory(c.category.stem) === stemToCategory(product.stem))
        if (category)
            category.products.push(product)
    })

    return grouped
})
</script>

<template>
    <div class="space-y-12">
        <ShopProductCategory
            v-for="item in groupedProducts"
            :key="item.category.name"
            :name="item.category.name"
        >
            <ShopProductCard
                v-for="product in item.products"
                :key="product.name"
                :product="product"
            />
        </ShopProductCategory>
    </div>
</template>
