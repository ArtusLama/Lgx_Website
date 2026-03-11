<script setup lang="ts">
withDefaults(defineProps<{
    tinytitle: string
    title: string
    align?: "left" | "center" | "right"
}>(), {
    align: "center",
})
</script>

<template>
    <div
        class="flex flex-col"
        :class="{
            'items-start text-left': align === 'left',
            'items-center text-center': align === 'center',
            'items-end text-right': align === 'right',
        }"
    >
        <TitleTinyText>
            {{ tinytitle }}
        </TitleTinyText>
        <TitleBigText>
            {{ title }}
        </TitleBigText>
    </div>
</template>
