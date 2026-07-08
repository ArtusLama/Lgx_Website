<script setup lang="ts">
const { links } = defineProps<{
    links: NavBarLink[]
}>()

const middleIndexLinks = computed(() => Math.ceil(links.length / 2))
const leftHalfLinks = computed(() => links.slice(0, middleIndexLinks.value))
const rightHalfLinks = computed(() => links.slice(middleIndexLinks.value))
</script>

<template>
    <nav
        aria-label="Desktop Navigation"
        class="gap-16 h-full w-full hidden items-center justify-center md:flex"
    >
        <ul class="flex gap-8">
            <li v-for="link in leftHalfLinks" :key="link.label">
                <NavDesktopLink :link="link" />
            </li>
        </ul>
        <NuxtLink to="/" @click="useScroll().toTop()">
            <NavLogo />
        </NuxtLink>
        <ul class="flex gap-8">
            <li v-for="link in rightHalfLinks" :key="link.label">
                <NavDesktopLink :link="link" />
            </li>
        </ul>

        <div class="right-8 absolute">
            <UiButton icon as-child>
                <NuxtLink to="/shop">
                    <Icon name="lucide:shopping-cart" />
                    Shop
                </NuxtLink>
            </UiButton>
        </div>
    </nav>
</template>
