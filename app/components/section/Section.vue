<script setup lang="ts">
withDefaults(defineProps<{
    secondaryBackground?: boolean
}>(), {
    secondaryBackground: false,
})
</script>

<template>
    <section
        :class="[
            secondaryBackground ? 'bg-background-secondary text-foreground-secondary' : 'bg-background text-foreground',
        ]"
        class="px-4 py-12 flex w-full items-center md:px-12 xl:px-24"
    >
        <div class="max-w-120rem">
            <slot />
        </div>
    </section>
</template>
