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
        class="text-nav-foreground font-medium underline-hover-anim transition-colors hover:opacity-80"
    >
        {{ link.label }}
    </NuxtLink>
</template>
