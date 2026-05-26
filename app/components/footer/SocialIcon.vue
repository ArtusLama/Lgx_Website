<script setup lang="ts">
const { color } = defineProps<{
    href: string
    icon: string
    color?: string
}>()

const bgColorVar = computed(() => {
    return color ? `${color}` : "var(--colors-foreground)"
})
</script>

<template>
    <NuxtLink
        target="_blank"
        :to="href"
        external
        class="text-foreground/90 p-3 border border-foreground/10 rounded-full bg-transparent bg-opacity-20 flex transition-colors items-center justify-center hover:(text-foreground border-foreground/20 bg-[--social-hover-bg])"
        :style="{ '--social-hover-bg': bgColorVar }"
    >
        <Icon :name="icon" :size="24" />
    </NuxtLink>
</template>
