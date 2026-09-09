import { defineCollection, defineContentConfig } from "@nuxt/content"
import { PartnerSchema } from "./shared/utils/content/schemas/partners/partner"
import { PixelArtSchema } from "./shared/utils/content/schemas/portfolio/pixelArt"
import { ProfilePictureSchema } from "./shared/utils/content/schemas/portfolio/profilePicture"
import { SkinSchema } from "./shared/utils/content/schemas/portfolio/skin"
import { ThumbnailSchema } from "./shared/utils/content/schemas/portfolio/thumbnail"
import { ShopCategorySchema } from "./shared/utils/content/schemas/shop/category"
import { ShopProductSchema } from "./shared/utils/content/schemas/shop/product"
import { TrustedByYouTubeChannelsSchema } from "./shared/utils/content/schemas/trustedBy/trustedByYouTubeChannels"

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

        portfolioProfilePictures: defineCollection({
            type: "data",
            source: "portfolio/profilePictures/*.json",
            schema: ProfilePictureSchema,
        }),

        portfolioSkins: defineCollection({
            type: "data",
            source: "portfolio/skins/*.json",
            schema: SkinSchema,
        }),

        portfolioPixelArt: defineCollection({
            type: "data",
            source: "portfolio/pixelArt/*.json",
            schema: PixelArtSchema,
        }),

        trustedByChannels: defineCollection({
            type: "data",
            source: "trustedBy/trustedByYouTubeChannels.json",
            schema: TrustedByYouTubeChannelsSchema,
        }),

        partners: defineCollection({
            type: "data",
            source: "partners/*.json",
            schema: PartnerSchema,
        }),
    },
})
