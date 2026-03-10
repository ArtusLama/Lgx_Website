<script setup lang="ts">
defineProps<{
    value: string
    title: string
    tag?: string
}>()
</script>

<template>
    <div
        class="group bg-background-secondary/20 border border-background-secondary/50 rounded-lg relative flex w-full items-center gap-3 p-4 shadow-xs outline-none
                has-data-[state=checked]:bg-primary has-data-[state=checked]:text-white"
    >
        <UiRadioGroupItem
            :id="value"
            :value="value"
            class="size-4 after:absolute after:inset-0 cursor-pointer"
        />
        <div class="">
            <UiLabel :for="value">
                <span class="text-lg font-semibold">
                    {{ title }}
                </span>
                <span
                    v-if="tag" class="text-sm text-muted-foreground font-semibold px-2 py-0.5 rounded-md border-[1.5px] border-muted-foreground/25
                                    group-has-data-[state=checked]:border-white group-has-data-[state=checked]:text-white"
                >
                    {{ tag }}
                </span>
            </UiLabel>
        </div>
    </div>
</template>
