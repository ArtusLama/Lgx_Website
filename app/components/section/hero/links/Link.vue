<script setup lang="ts">
const props = defineProps<{
    label: string
    href?: string
    scrollTo?: string
}>()

function scrollToTarget() {
    if (!props.scrollTo)
        return

    useScrollTo(props.scrollTo)
}
</script>

<template>
    <li>
        <NuxtLink :to="href || scrollTo" :target="!!href ? '_blank' : '_self'" :external="!!href" @click="scrollToTarget">
            {{ label }}
        </NuxtLink>
    </li>
</template>
