<script setup lang="ts">
defineProps<{
    title: string
    links: NavigationLink[]
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
                :link="link"
            />
        </ul>
    </div>
</template>
