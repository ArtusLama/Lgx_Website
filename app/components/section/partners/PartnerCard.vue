<script setup lang="ts">
defineProps<{
    partner: Partner
}>()
</script>

<template>
    <div>
        <p>{{ partner.name }}</p>
        <p>{{ partner.description }}</p>
        <p><a :href="partner.link.url" target="_blank">{{ partner.link.label }}</a></p>
    </div>
</template>
