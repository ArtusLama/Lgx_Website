import { defineCollection, defineContentConfig } from "@nuxt/content"
import { ShopCategorySchema } from "./shared/types/category"
import { ShopProductSchema } from "./shared/types/product"
import { TestimonialSchema } from "./shared/types/testimonial"

export default defineContentConfig({
    collections: {
        testimonials: defineCollection({
            type: "data",
            source: "testimonials/**.yml",
            schema: TestimonialSchema,
        }),
        shopCategories: defineCollection({
            type: "data",
            source: "shop/products/**/_category.yml",
            schema: ShopCategorySchema,
        }),
        shopProducts: defineCollection({
            type: "data",
            source: "shop/products/**/!(_category).yml",
            schema: ShopProductSchema,
        }),
    },
})
