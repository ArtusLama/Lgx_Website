<script setup lang="ts">
const { link } = defineProps<{
    link: NavigationLink
}>()

const emit = defineEmits<{
    navigate: []
}>()

const scrollToIdTarget = computed(() => {
    if (!link.scrollToTarget)
        return undefined
    const hashIndex = link.to.indexOf("#")
    return hashIndex !== -1 ? link.to.substring(hashIndex) : `#${link.to}`
})

const cleanPath = computed(() => {
    if (!link.scrollToTarget)
        return link.to
    const hashIndex = link.to.indexOf("#")
    return hashIndex !== -1 ? link.to.substring(0, hashIndex) : link.to
})

function handleClick() {
    emit("navigate")

    if (link.external) {
        return
    }

    if (scrollToIdTarget.value) {
        useScrollTo(scrollToIdTarget.value)

        if (useRoute().path === cleanPath.value) {
            useScrollTo(scrollToIdTarget.value)
            useRouter().push({ path: cleanPath.value })
        }
    }
    else if (useRoute().path === cleanPath.value && !scrollToIdTarget.value) {
        useLenis().value?.scrollTo(0)
    }
}
</script>

<template>
    <UiButton
        as-child
        variant="ghost"
        class="text-base w-full max-w-[24rem] justify-start"
    >
        <NuxtLink
            :to="link.external ? link.to : { hash: scrollToIdTarget, path: cleanPath }"
            :target="link.external ? '_blank' : '_self'"
            class="font-semibold text-muted-foreground tracking-tight w-full text-left"
            @click="handleClick"
        >
            {{ link.label }}
        </NuxtLink>
    </UiButton>
</template>
