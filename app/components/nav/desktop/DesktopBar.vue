<script setup lang="ts">
const { links } = defineProps<{
    links: NavBarLink[]
}>()

const middleIndexLinks = computed(() => Math.ceil(links.length / 2))
const leftHalfLinks = computed(() => links.slice(0, middleIndexLinks.value))
const rightHalfLinks = computed(() => links.slice(middleIndexLinks.value))

function scrollToTop() {
    const lenis = useLenis().value
    if (lenis) {
        lenis.scrollTo(0)
    }
    else {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
}
</script>

<template>
    <nav class="gap-16 h-full w-full hidden items-center justify-center md:flex">
        <ul class="flex gap-8">
            <li v-for="link in leftHalfLinks" :key="link.label">
                <NavDesktopLink :link="link" />
            </li>
        </ul>
        <div class="cursor-pointer" @click="scrollToTop">
            <NavLogo />
        </div>
        <ul class="flex gap-8">
            <li v-for="link in rightHalfLinks" :key="link.label">
                <NavDesktopLink :link="link" />
            </li>
        </ul>

        <NuxtLink to="/shop" class="right-8 absolute">
            SHOP
        </NuxtLink>
    </nav>
</template>
