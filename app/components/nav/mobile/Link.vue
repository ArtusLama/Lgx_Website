<script setup lang="ts">
defineProps<{
    link: NavBarLink
}>()
</script>

<template>
    <NuxtLink
        :to="link.to"
        :target="link.external ? '_blank' : '_self'"
        :external="link.external"
        active-class="text-primary"
        class="text-4xl text-nav-foreground font-bold font-jakarta underline-hover-anim italic transition-colors hover:opacity-80"
    >
        {{ link.label }}
    </NuxtLink>
</template>
