<script setup lang="ts">
defineProps<{
    name: string
}>()
</script>

<template>
    <div class="space-y-4">
        <h3 class="text-2xl font-semibold underline">
            {{ name }}
        </h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <slot />
        </div>
    </div>
</template>
