<script setup lang="ts">
const {
    pending: shopCategoriesPending,
    error: shopCategoriesError,
    data: shopCategories,
} = useLazyAsyncData("shop-categories", () => queryCollection("shopCategories").all())

const {
    pending: shopProductsPending,
    error: shopProductsError,
    data: shopProducts,
} = useLazyAsyncData("shop-products", () => queryCollection("shopProducts").all())

function stemToCategory(stem: string) {
    // Removes from right until slash or backslash and use as result the text from there until the next slash or backslash (on the left). Example: ".../categories/test/_category" -> "test"
    const match = stem.match(/([^\\/]+)[\\/][^\\/]*$/)
    return match ? match[1] : stem
}

interface GroupedCategory {
    category: ShopCategory
    products: ShopProduct[]
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
        // TODO: fix type
        const category = categories.find(c => stemToCategory(c.category.stem) === stemToCategory(product.stem))
        if (category)
            category.products.push(product)
    })

    return categories.filter(c => c.products.length > 0)
})
</script>

<template>
    <div>
        <div
            v-if="!shopCategoriesError && !shopProductsError"
            class="m-4 p-8 border border-blue-300"
        >
            <div v-if="!shopCategoriesPending && !shopProductsPending">
                <ShopCategory
                    v-for="group in groupedProducts"
                    :key="group.category.stem"
                    :category="group.category"
                    :products="group.products"
                />
            </div>
            <div v-else>
                <p>Loading...</p>
            </div>
        </div>
        <div v-else>
            <p>ERROR</p>
        </div>
    </div>
</template>
