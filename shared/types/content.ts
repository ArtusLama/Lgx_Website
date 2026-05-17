import type { DataCollectionItemBase } from "@nuxt/content"
import type { ShopCategory } from "../utils/content/schemas/shop/category"
import type { ShopProduct } from "../utils/content/schemas/shop/product"

export type { Thumbnail } from "../utils/content/schemas/portfolio/thumbnail"
export type { TrustedByChannel } from "../utils/content/schemas/portfolio/trustedByChannels"
export type { ShopCategory }
export type { ShopProduct }

export type ContentEntry<T> = T & DataCollectionItemBase
export type ShopCategoryEntry = ContentEntry<ShopCategory>
export type ShopProductEntry = ContentEntry<ShopProduct>
