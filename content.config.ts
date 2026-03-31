import { defineCollection, defineContentConfig } from "@nuxt/content"
import { ShopCategorySchema } from "./shared/types/content/category"
import { ShopProductSchema } from "./shared/types/content/product"
import { ThumbnailShowcaseSchema } from "./shared/types/content/showcase/thumbnailShowcase"
import { TestimonialSchema } from "./shared/types/content/testimonial"

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
        showcaseThumbnails: defineCollection({
            type: "data",
            source: "showcase/thumbnails/**.yml",
            schema: ThumbnailShowcaseSchema,
        }),

    },
})
