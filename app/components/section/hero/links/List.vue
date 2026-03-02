<script setup lang="ts">
defineProps<{
    title: string
    links: {
        label: string
        href?: string
        scrollTo?: string
    }[]
}>()
</script>

<template>
    <div>
        <p class="text-2xl text-primary font-bold tracking-tight">
            {{ title }}
        </p>
        <ul class="mt-4 uppercase flex flex-col gap-1 text-3xl font-black text-foreground-secondary">
            <SectionHeroLinksLink
                v-for="link in links"
                :key="link.label"
                v-bind="link"
            />
        </ul>
    </div>
</template>
