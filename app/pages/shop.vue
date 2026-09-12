<script setup lang="ts">
useSeoMeta({
    title: "Shop Commissions Coming Soon",
    description: "The Raspocket Studios shop is coming soon. Visit Ko-fi to inquire about Minecraft thumbnails, banners, profile pictures, and other creator graphics.",
    robots: "noindex, follow",
})

useHead({
    script: [
        {
            src: "https://cdn.ko-fi.tools/v2/js/shop.js",
            defer: true,
        },
        {
            src: "https://cdn.ko-fi.tools/v2/js/commissions.js",
            defer: true,
        },
    ],
})
</script>

<template>
    <div class="mt-18 px-10 py-16 pb-8 text-center flex flex-col gap-8 items-center justify-center md:mt-32">
        <div class="text-center flex flex-col items-center justify-center space-y-6">
            <h1 class="text-4xl font-bold sm:text-6xl xl:text-7xl">
                Explore my<br>
                <span class="text-5xl text-primary font-black sm:text-7xl xl:text-8xl">Commissions</span>
                <br>
                and <span class="font-black font-italic">more</span>!
            </h1>
            <h2 class="text-2xl font-semibold opacity-80 max-w-200">
                Explore custom Minecraft thumbnails, banners, profile pictures, and digital artwork created to help your content stand out.
            </h2>

            <UiButton icon as-child class="mt-4 w-fit">
                <NuxtLink to="https://ko-fi.com/lgxgfx" target="_blank">
                    <Icon name="simple-icons:kofi" class="-mb-0.3" :size="18" />
                    View on Ko-fi
                </NuxtLink>
            </UiButton>
        </div>

        <div id="kofi-commissions-embed" class="max-w-400" data-commissions-id="D1D61GGK54" data-commissions-currency="€" data-commissions-theme="default" />
        <div id="kofi-shop-embed" class="max-w-400" data-shop-id="D1D61GGK54" data-shop-currency="€" data-shop-theme="default" data-shop-soldout="show" />
    </div>
</template>
