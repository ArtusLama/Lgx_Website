<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{
    error: NuxtError
}>()

const handleError = () => clearError({ redirect: "/" })
</script>

<template>
    <div class="px-6 py-24 bg-background flex min-h-screen items-center justify-center relative overflow-hidden sm:px-10">
        <UiButton icon @click="handleError">
            <Icon name="lucide:arrow-left" :size="18" />
            Bring me back
        </UiButton>
    </div>
</template>
