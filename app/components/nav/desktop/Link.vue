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
        active-class="text-amber-500"
    >
        {{ link.label }}
    </NuxtLink>
</template>
