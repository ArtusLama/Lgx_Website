<script setup lang="ts">
useSeoMeta({
    description: "MAIN DESCRIPTION",
})
</script>

<template>
    <div class="flex flex-col items-center">
        <SectionHero class="mt-30 md:mt-10" />

        <div id="hero-nav-observer" />

        <SectionTrusted class="mt-20" />

        <SectionGalleryThumbnail only-preview class="mt-32" />

        <p class="h-600" />
    </div>
</template>
