<script setup lang="ts">
interface ShopProductEntry {
    name: string
    description: string
    detailsList?: string[]
    price: string
    deliveryTime: string
    tag?: {
        name: string
        color: ProductTagColor
    }
    shopUrl: string
    exampleImages?: string[]
    path?: string
    _path?: string
    id?: string
    stem?: string
}

interface ShopCategoryEntry {
    name: string
    path?: string
    _path?: string
    id?: string
    stem?: string
}

const fallbackProductImages = [
    "https://images.unsplash.com/photo-1761839257658-23502c67f6d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1770131091438-c5c4b89ea264?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1770463121428-62c4a6198cfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1773083405877-de30a150a39b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
]

const { data: shopProducts } = await useAsyncData("shop-products", () => queryCollection("shopProducts").all())
const { data: shopCategories } = await useAsyncData("shop-categories", () => queryCollection("shopCategories").all())

function toPathLike(entry: ShopProductEntry | ShopCategoryEntry): string {
    return String(entry.path ?? entry._path ?? entry.id ?? entry.stem ?? "").replaceAll("\\", "/")
}

function extractFolderName(pathLike: string): string {
    const parts = pathLike.split("/")
    const productsIndex = parts.findIndex(part => part === "products")

    if (productsIndex === -1 || productsIndex + 1 >= parts.length)
        return ""

    return parts[productsIndex + 1] || ""
}

function slugifyName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

const groupedProducts = computed(() => {
    const categoriesRaw = (shopCategories.value ?? []) as ShopCategoryEntry[]
    const productsRaw = (shopProducts.value ?? []) as ShopProductEntry[]

    const categories = categoriesRaw
        .map((category) => {
            const pathLike = toPathLike(category)
            const folderName = extractFolderName(pathLike)

            return {
                name: category.name,
                folderName,
            }
        })
        .filter(category => category.folderName.length > 0)

    const products = productsRaw
        .map((entry) => {
            const pathLike = toPathLike(entry)
            const folderName = extractFolderName(pathLike)
            const productPrice = Number.parseFloat(entry.price)

            return {
                folderName,
                product: {
                    id: slugifyName(entry.name),
                    name: entry.name,
                    tag: entry.tag?.name,
                    tagColor: entry.tag?.color,
                    description: entry.description,
                    descriptionList: entry.detailsList,
                    images: entry.exampleImages?.length ? entry.exampleImages : fallbackProductImages,
                    price: Number.isFinite(productPrice) ? productPrice : 0,
                    deliveryTime: entry.deliveryTime,
                    shopUrl: entry.shopUrl,
                } satisfies Product,
            }
        })

    return categories
        .map(category => ({
            name: category.name,
            products: products
                .filter(product => product.folderName === category.folderName)
                .map(product => product.product),
        }))
        .filter(category => category.products.length > 0)
})
</script>

<template>
    <div class="space-y-12">
        <ShopProductCategory
            v-for="category in groupedProducts"
            :key="category.name"
            :name="category.name"
        >
            <ShopProductCard
                v-for="product in category.products"
                :key="product.id"
                :product="product"
            />
        </ShopProductCategory>
    </div>
</template>
