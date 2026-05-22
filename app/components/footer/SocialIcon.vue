<script setup lang="ts">
defineProps<{
    href: string
    icon: string
}>()
</script>

<template>
    <NuxtLink
        target="_blank"
        :to="href"
        external
        class="text-foreground/90 p-3 border border-foreground/10 rounded-full bg-transparent flex transition-colors items-center justify-center hover:(text-foreground border-foreground/20 bg-foreground/5)"
    >
        <Icon :name="icon" :size="24" />
    </NuxtLink>
</template>
