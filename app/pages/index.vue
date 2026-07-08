<script setup lang="ts">
useSeoMeta({
    title: undefined, // -> use default title template
    description: "I'm Lgx_, the graphic designer behind RaspocketStudios. This is my portfolio page for Minecraft thumbnails, banners, digital art, and YouTube content. Contact me for commissions.",
})
</script>

<template>
    <div>
        <SectionHero />
        <SectionBestWorkShowcase class="-z-10" />

        <SectionTrustedByChannels class="pt-32" />

        <SectionStats class="py-32" />

        <SectionContact class="pt-32" />
    </div>
</template>
