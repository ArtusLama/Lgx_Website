<script setup lang="ts">
defineProps<{
    name: string
}>()
</script>

<template>
    <section
        :id="name"
        :aria-label="`Section ${name}`"
        class="relative w-full max-w-400"
    >
        <slot />
    </section>
</template>
