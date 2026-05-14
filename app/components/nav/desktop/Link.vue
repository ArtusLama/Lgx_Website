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
    >
        {{ link.label }}
    </NuxtLink>
</template>
