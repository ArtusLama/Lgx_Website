<script setup lang="ts">
useSeoMeta({
    title: "Shop",
    description: "My shop is currently a work in progress. For now, visit my Ko-fi for commissions and future digital products from RaspocketStudios.",
})
</script>

<template>
    <div class="mt-18 px-10 py-16 text-center flex flex-col gap-8 items-center justify-center md:mt-32">
        <!-- TODO: IN PROGRESS
        <SectionShopProducts />
        <UiFullscreenImageView />
        -->
        <h1 class="text-4xl font-bold sm:text-6xl xl:text-7xl">
            The Shop is<br><span class="text-5xl text-primary font-black sm:text-7xl xl:text-8xl">Coming Soon</span>
        </h1>
        <h2 class="text-2xl font-semibold opacity-90">
            For now, check out my Ko-fi!
        </h2>
        <UiButton icon as-child>
            <NuxtLink to="https://ko-fi.com/lgxgfx" target="_blank">
                <Icon name="simple-icons:kofi" class="mr-2 -mb-0.5" :size="22" />
                Visit Ko-fi
            </NuxtLink>
        </UiButton>
    </div>
</template>
