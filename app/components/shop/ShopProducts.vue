<script setup lang="ts">
const tempProductImages = [
    "https://images.unsplash.com/photo-1761839257658-23502c67f6d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1770131091438-c5c4b89ea264?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    "https://plus.unsplash.com/premium_photo-1770463121428-62c4a6198cfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1773083405877-de30a150a39b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D",
]

const commissions: Product[] = [
    {
        id: "mc-thumbnail",
        name: "Thumbnails",
        tag: "Popular",
        tagColor: "primary",
        description: "Minecraft thumbnail commissions.",
        descriptionList: [
            "Price range: $5-50 (usually $7-17)",
            "Delivery: 1-5 days depending on complexity",
            "Price depends on detail and effects",
        ],
        images: tempProductImages,
        price: 5,
    },
    {
        id: "gfx-pfp",
        name: "Profile Pictures",
        description: "GFX profile picture commissions.",
        descriptionList: [
            "Basic: $5-10",
            "Advanced: $15-20",
            "Delivery: 1-7 days depending on complexity",
        ],
        images: tempProductImages,
        price: 5,
    },
    {
        id: "gfx-banner",
        name: "Banners",
        description: "GFX banner commissions for channels and social platforms.",
        descriptionList: [
            "Basic: $5-10",
            "Advanced: $20-35",
            "Delivery: 1-7 days depending on complexity",
        ],
        images: tempProductImages,
        price: 5,
    },
    {
        id: "gfx-icon",
        name: "Icons",
        description: "Custom icon commissions.",
        descriptionList: [
            "Price range: $3-10",
            "Delivery: 1-7 days depending on complexity",
        ],
        images: tempProductImages,
        price: 3,
    },
    {
        id: "gfx-pixel-art",
        name: "Pixel Art",
        tag: "Custom",
        tagColor: "muted",
        description: "Custom pixel art commissions.",
        descriptionList: [
            "Price varies by canvas size and complexity",
            "Static or animated styles available on request",
            "Delivery: 2-7 days",
        ],
        images: tempProductImages,
        price: 10,
    },
    {
        id: "mc-skin",
        name: "Skin",
        description: "Minecraft skin commissions for revamps or fully new skins.",
        descriptionList: [
            "Price range: $5-15",
            "Delivery: 2-5 days",
            "Price may vary based on custom requests",
        ],
        images: tempProductImages,
        price: 5,
    },
]

const bundles: Product[] = [
    {
        id: "mc-thumbnail-bundle-3",
        name: "3x Thumbnail Bundle",
        description: "Three custom Minecraft thumbnails with bundle savings.",
        descriptionList: [
            "Bundle discount: -10%",
            "Based on Minecraft thumbnail commissions",
            "Final price can vary by request complexity",
        ],
        images: tempProductImages,
        price: 13.5,
    },
    {
        id: "mc-thumbnail-bundle-5",
        name: "5x Thumbnail Bundle",
        tag: "Best Value",
        tagColor: "primary",
        description: "Five custom Minecraft thumbnails with stronger bundle savings.",
        descriptionList: [
            "Bundle discount: -20%",
            "Based on Minecraft thumbnail commissions",
            "Final price can vary by request complexity",
        ],
        images: tempProductImages,
        price: 20,
    },
    {
        id: "mc-skin-pfp-bundle",
        name: "Skin + PFP Bundle",
        description: "Bundle deal for creators who want matching identity assets.",
        descriptionList: [
            "Includes Minecraft Skin + Profile Picture",
            "Delivery: 2-5 days",
            "Price may vary based on detail and custom requests",
        ],
        images: tempProductImages,
        price: 15,
    },
]

const psds: Product[] = [
    {
        id: "psd-thumbnail",
        name: "Thumbnail PSD",
        tag: "Source File",
        tagColor: "muted",
        description: "Layered PSD source file for your thumbnail design.",
        descriptionList: [
            "Editable text, effects, and composition layers",
            "Great for future edits and reuse",
            "Delivery: 1-3 days",
        ],
        images: tempProductImages,
        price: 10,
    },
    {
        id: "psd-banner",
        name: "Banner PSD",
        description: "Layered PSD source file for channel and social banners.",
        descriptionList: [
            "Organized layers for easy updates",
            "Built for scalable exports",
            "Delivery: 1-4 days",
        ],
        images: tempProductImages,
        price: 12,
    },
    {
        id: "psd-pfp",
        name: "Profile Picture PSD",
        description: "PSD source for profile picture commissions.",
        descriptionList: [
            "Layered source for recolors and variants",
            "Includes editable elements where possible",
            "Delivery: 1-3 days",
        ],
        images: tempProductImages,
        price: 8,
    },
]

const gfxPack: Product[] = [
    {
        id: "gfx-pack-starter",
        name: "GFX Starter Pack",
        tag: "Limited",
        tagColor: "destructive",
        description: "One complete creator branding pack.",
        descriptionList: [
            "Includes: Thumbnail + Profile Picture + Banner",
            "Consistent visual style across all assets",
            "Delivery: 3-7 days depending on complexity",
        ],
        images: tempProductImages,
        price: 30,
    },
]
</script>

<template>
    <div class="space-y-12">
        <ShopProductCategory name="Commissions">
            <ShopProductCard
                v-for="product in commissions"
                :key="product.id"
                :product="product"
            />
        </ShopProductCategory>

        <ShopProductCategory name="Bundles">
            <ShopProductCard
                v-for="product in bundles"
                :key="product.id"
                :product="product"
            />
        </ShopProductCategory>

        <ShopProductCategory name="PSDs">
            <ShopProductCard
                v-for="product in psds"
                :key="product.id"
                :product="product"
            />
        </ShopProductCategory>

        <ShopProductCategory name="GFX Pack">
            <ShopProductCard
                v-for="product in gfxPack"
                :key="product.id"
                :product="product"
            />
        </ShopProductCategory>
    </div>
</template>
