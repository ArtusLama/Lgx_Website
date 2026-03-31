<script setup lang="ts">
const { link } = defineProps<{
    link: NavigationLink
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
    <NuxtLink
        :to="link.external ? link.to : { hash: scrollToIdTarget, path: cleanPath }"
        :target="link.external ? '_blank' : '_self'"
        class="px-4 py-2 group tracking-tight text-muted-foreground transition-all hover:text-primary"
        @click="handleClick"
    >
        <span class="underline-base underline-duration-slow underline-center underline-timing-spring group-hover:underline-expanded">
            {{ link.label }}
        </span>
    </NuxtLink>
</template>
