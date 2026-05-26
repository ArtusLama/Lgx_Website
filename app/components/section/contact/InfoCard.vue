<script setup lang="ts">
defineProps<{
    title: string
    description: string
    icon: string
}>()
</script>

<template>
    <div class="p-4 border border-foreground-secondary/10 rounded-xl bg-foreground-secondary/5 space-y-2">
        <div class="flex gap-3 items-center">
            <Icon :name="icon" class="text-primary" />
            <p class="text-base tracking-wider font-bold uppercase">
                {{ title }}
            </p>
        </div>
        <p class="text-sm text-foreground-secondary/75">
            {{ description }}
        </p>
    </div>
</template>
