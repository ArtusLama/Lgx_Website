<script setup lang="ts">
const {
    pending: shopCategoriesPending,
    error: shopCategoriesError,
    data: shopCategories,
} = useLazyAsyncData<ShopCategoryEntry[]>("shop-categories", () => queryCollection("shopCategories").all())

const {
    pending: shopProductsPending,
    error: shopProductsError,
    data: shopProducts,
} = useLazyAsyncData<ShopProductEntry[]>("shop-products", () => queryCollection("shopProducts").all())

const pending = computed(() => shopCategoriesPending.value || shopProductsPending.value)
const hasError = computed(() => !!shopCategoriesError.value || !!shopProductsError.value)

function stemToCategory(stem: string) {
    // Removes from right until slash or backslash and use as result the text from there until the next slash or backslash (on the left). Example: ".../categories/test/_category" -> "test"
    const match = stem.match(/([^\\/]+)[\\/][^\\/]*$/)
    return match ? match[1] : stem
}

interface GroupedCategory {
    category: ShopCategoryEntry
    products: ShopProductEntry[]
}

const groupedProducts: ComputedRef<GroupedCategory[]> = computed(() => {
    if (!shopProducts.value || !shopCategories.value || shopProductsPending.value || shopCategoriesPending.value || shopProductsError.value || shopCategoriesError.value)
        return []

    const categories: GroupedCategory[] = []
    shopCategories.value.forEach((category) => {
        categories.push({
            category,
            products: [],
        })
    })

    shopProducts.value.forEach((product) => {
        const category = categories.find(c => stemToCategory(c.category.stem) === stemToCategory(product.stem))
        if (category)
            category.products.push(product)
    })

    return categories.filter(c => c.products.length > 0)
})
</script>

<template>
    <div v-if="pending">
        <p>Loading...</p>
    </div>
    <div v-else-if="hasError">
        <p>ERROR</p>
    </div>
    <div v-else>
        <ShopCategory
            v-for="(group, index) in groupedProducts"
            :key="group.category.name"
            :category="group.category"
            :products="group.products"
            :index="index"
        />
    </div>
</template>
