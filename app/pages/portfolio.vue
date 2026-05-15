<script setup lang="ts">
const { pending, error, data } = useLazyAsyncData("portfolio-thumbnails", () => queryCollection("portfolioThumbnails").all())
</script>

<template>
    <div>
        <p>portfolio</p>
        <p>{{ pending }}</p>
        <p>{{ error }}</p>

        <ul>
            <li v-for="(thumbnail, index) in data" :key="index">
                {{ thumbnail }}
            </li>
        </ul>
    </div>
</template>
