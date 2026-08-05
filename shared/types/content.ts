import type { DataCollectionItemBase } from "@nuxt/content"
import type { Partner, Partners } from "../utils/content/schemas/partners/partner"
import type { ShopCategory } from "../utils/content/schemas/shop/category"
import type { ShopProduct } from "../utils/content/schemas/shop/product"

export type { Partner, Partners }
export type { Banner } from "../utils/content/schemas/portfolio/banner"
export type { ProfilePicture } from "../utils/content/schemas/portfolio/profilePicture"
export type { Thumbnail } from "../utils/content/schemas/portfolio/thumbnail"
export type { TrustedByYouTubeChannels } from "../utils/content/schemas/trustedBy/trustedByYouTubeChannels"
export type { ShopCategory }
export type { ShopProduct }

type ContentEntry<T> = T & DataCollectionItemBase
export type PartnerEntry = ContentEntry<Partner>
export type PartnersEntry = ContentEntry<Partners>
export type ShopCategoryEntry = ContentEntry<ShopCategory>
export type ShopProductEntry = ContentEntry<ShopProduct>
