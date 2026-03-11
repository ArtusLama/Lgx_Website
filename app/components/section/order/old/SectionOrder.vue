<script setup lang="ts">
const commissions: CommissionItem[] = [
    {
        id: "mc-thumbnail",
        title: "Minecraft Thumbnail",
        description: "Custom Minecraft-themed thumbnails for your videos.",
        priceRange: "$5-50",
        diliveryTimeRange: "1-5 days",
        exampleImages: [],
        variants: [
            {
                id: "mc-thumbnail-basic",
                title: "Basic Thumbnail",
                description: "A simple thumbnail with minimal details.",
                price: 5,
                deliveryTime: "1 day",
            },
            {
                id: "mc-thumbnail-standard",
                title: "Standard Thumbnail",
                description: "A thumbnail with moderate details and effects.",
                price: 20,
                deliveryTime: "3 days",
            },
            {
                id: "mc-thumbnail-premium",
                title: "Premium Thumbnail",
                description: "A highly detailed thumbnail with advanced effects.",
                price: 50,
                deliveryTime: "5 days",
            },
        ],
    },
    // Add more commission items as needed
]
</script>

<template>
    <Section name="order">
        <div class="flex flex-col items-center text-center">
            <p class="text-4xl font-bold">
                Commission Open
            </p>
            <p class="text-6xl font-bold text-primary">
                Get your own piece of art!
            </p>
        </div>

        <div class="mt-12 flex gap-x-12 flex-wrap justify-evenly items-start">
            <div class="max-w-100">
                <SectionOrderSelectSidebarWrapper>
                    <SectionOrderSelectGroup name="Bundle Deals" tag="Best Value">
                        <SectionOrderSelectCard value="mc-thumbnail-bundle-3" title="3x Thumbnail Bundle" tag="-10%" />
                        <SectionOrderSelectCard value="mc-thumbnail-bundle-5" title="5x Thumbnail Bundle" tag="-20%" />
                        <SectionOrderSelectCard value="mc-skin-pfp-bundle" title="Skin + PFP Bundle" tag="$15" />
                    </SectionOrderSelectGroup>

                    <SectionOrderSelectGroup name="Minecraft Thumbnails" tag="Most Bought">
                        <SectionOrderSelectCard value="mc-thumbnail" title="Minecraft Thumbnail" tag="$5–50 • 1–5 days" />
                    </SectionOrderSelectGroup>

                    <SectionOrderSelectGroup name="Creator Essentials">
                        <SectionOrderSelectCard value="gfx-pfp" title="Profile Pictures" tag="$5–20 • 1–7 days" />
                        <SectionOrderSelectCard value="gfx-banner" title="Banners" tag="$5–35 • 1–7 days" />
                    </SectionOrderSelectGroup>

                    <SectionOrderSelectGroup name="Extra Customs">
                        <SectionOrderSelectCard value="mc-skin" title="Minecraft Skin" tag="$5–15 • 2–5 days" />
                        <SectionOrderSelectCard value="gfx-icon" title="Icons" tag="$3–10 • 1–7 days" />
                        <SectionOrderSelectCard value="gfx-wallpaper" title="Wallpapers" tag="$5–50 • 1–7 days" />
                    </SectionOrderSelectGroup>
                </SectionOrderSelectSidebarWrapper>

                <p class="mt-6 text-center text-sm text-muted-foreground font-medium">
                    Final price depends on detail, effects, and custom requests.
                </p>
            </div>

            <SectionOrderDetailsCard v-if="commissions[0]" class="mt-6 flex-1 min-w-150 max-w-200" :commission="commissions[0]" />
        </div>
    </Section>
</template>
