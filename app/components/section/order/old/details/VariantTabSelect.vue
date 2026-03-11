<script setup lang="ts">
defineProps<{
    variants: CommissionVariant[]
}>()
</script>

<template>
    <UiTabs :default-value="variants[0]?.id">
        <UiTabsList>
            <UiTabsTrigger
                v-for="variant in variants"
                :key="variant.id"
                :value="variant.id"
            >
                {{ variant.title }}
            </UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent
            v-for="variant in variants"
            :key="variant.id"
            :value="variant.id"
            class="mt-4"
        >
            <SectionOrderDetailsVariantDetails :variant="variant" />
        </UiTabsContent>
    </UiTabs>
</template>
