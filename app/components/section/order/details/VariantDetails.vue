<script setup lang="ts">
defineProps<{
    variant: CommissionVariant
}>()
</script>

<template>
    <div>
        <p>Variant Details</p>
        <p>{{ variant.title }}</p>
        <p>{{ variant.description }}</p>
    </div>
</template>
