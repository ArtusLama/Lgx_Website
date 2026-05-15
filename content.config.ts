import { defineCollection, defineContentConfig } from "@nuxt/content"
import { ThumbnailSchema } from "./shared/types/content/portfolio/thumbnail"
import { ShopCategorySchema } from "./shared/types/content/shop/category"
import { ShopProductSchema } from "./shared/types/content/shop/product"

export default defineContentConfig({
    collections: {
        shopCategories: defineCollection({
            type: "data",
            source: "shop/categories/**/_category.json",
            schema: ShopCategorySchema,
        }),
        shopProducts: defineCollection({
            type: "data",
            source: "shop/categories/**/!(_category).json",
            schema: ShopProductSchema,
        }),

        portfolioThumbnails: defineCollection({
            type: "data",
            source: "portfolio/thumbnails/*.json",
            schema: ThumbnailSchema,
        }),
    },
})
