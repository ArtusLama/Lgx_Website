<script setup lang="ts">
defineProps<{
    name: string
    tag?: string
}>()
</script>

<template>
    <UiAccordionItem :value="name">
        <UiAccordionTrigger>
            <slot name="trigger">
                <p class="font-semibold tracking-tight text-base mt-0.5">
                    {{ name }}
                    <span v-if="tag" class="border border-primary text-primary text-xs font-medium ml-2 px-1.5 py-0.5 rounded">
                        {{ tag }}
                    </span>
                </p>
            </slot>
        </UiAccordionTrigger>
        <UiAccordionContent>
            <div class="flex flex-col gap-2">
                <slot />
            </div>
        </UiAccordionContent>
    </UiAccordionItem>
</template>
