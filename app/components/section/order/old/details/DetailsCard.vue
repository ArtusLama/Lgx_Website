<script setup lang="ts">
defineProps<{
    commission: CommissionItem
}>()
</script>

<template>
    <div class="bg-background-secondary/20 border border-background-secondary/50 rounded-lg p-6 shadow-sm">
        <div>
            <h3 class="text-xl font-bold">
                {{ commission.title }}
            </h3>
            <p class="text-sm text-muted-foreground">
                {{ commission.description }}
            </p>
        </div>
        <!-- TODO: Carousel for example images -->

        <div class="mt-4 aspect-video rounded-lg w-100 bg-red-300" />

        <div class="mt-4">
            <SectionOrderDetailsVariantTabSelect
                :variants="commission.variants"
            />
        </div>
    </div>
</template>
