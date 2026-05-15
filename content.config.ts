import { defineCollection, defineContentConfig } from "@nuxt/content"
import { ThumbnailSchema } from "./shared/utils/content/schemas/portfolio/thumbnail"
import { ShopCategorySchema } from "./shared/utils/content/schemas/shop/category"
import { ShopProductSchema } from "./shared/utils/content/schemas/shop/product"

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
