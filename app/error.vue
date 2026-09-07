<script setup lang="ts">
import type { NuxtError } from "#app"

const { error } = defineProps<{
    error: NuxtError
}>()

const handleError = () => clearError({ redirect: "/" })
const isNotFound = computed(() => error.status === 404)

useSeoMeta({
    title: error.status === 404 ? "404 - Page Not Found | Raspocket Studios" : "Error | Raspocket Studios",
    robots: "noindex, nofollow",
})
</script>

<template>
    <div class="px-6 py-24 bg-background flex min-h-screen items-center justify-center relative overflow-hidden sm:px-10">
        <div class="bg-[url('/imgs/HeroBackground.png')] opacity-20 pointer-events-none inset-0 absolute bg-cover bg-center" />

        <main class="text-center max-w-2xl relative z-1">
            <p class="text-[clamp(7rem,30vw,16rem)] text-foreground/40 leading-[0.72] tracking-[-0.03em] font-black select-none">
                {{ error.status || "500" }}
            </p>

            <div class="mt-10">
                <h1 class="text-3xl leading-tight font-black sm:text-5xl">
                    {{ isNotFound ? "This page took a wrong turn." : "The studio hit a rough edge." }}
                </h1>
                <p class="text-base text-foreground/80 leading-relaxed mx-auto mt-5 max-w-md sm:text-lg">
                    {{ isNotFound ? "The page was not found. It may have moved or no longer exists." : "Something unexpected happened. Head back to the studio and try again." }}
                </p>
            </div>

            <div class="mt-9 flex justify-center">
                <UiButton icon @click="handleError">
                    <Icon name="lucide:arrow-left" :size="18" />
                    Bring me back
                </UiButton>
            </div>

            <div class="text-xs text-foreground/70 tracking-wider mt-42 flex flex-col gap-1 uppercase items-center">
                <SvgLogoSignature class="h-fit w-36" />
                <span class="text-foreground/80">Pocket Studios</span>
            </div>
        </main>
    </div>
</template>
