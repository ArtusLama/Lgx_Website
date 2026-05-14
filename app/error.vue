<script setup lang="ts">
import type { NuxtError } from "#app"

const { error } = defineProps<{
    error: NuxtError
}>()

const handleError = () => clearError({ redirect: "/" })

useSeoMeta({
    title:
        error.status === 404
            ? "404 - Page Not Found | Raspocket Studios"
            : "Error | Raspocket Studios",
    robots: "noindex, nofollow",
})
</script>

<template>
    <div>
        <!-- TODO: Implement error page -->
        <h1 class="text-4xl font-bold mb-4">
            An error occurred
        </h1>

        <p class="text-lg mb-8">
            {{ error.status }} - {{ error.message }}
        </p>

        <button
            class="hover:bg-primary-dark px-4 py-2 rounded bg-gray-500 transition-colors"
            @click="handleError"
        >
            Go back to Home
        </button>
    </div>
</template>
