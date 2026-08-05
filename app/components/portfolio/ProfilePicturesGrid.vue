<script setup lang="ts">
const { pending, error, data: profilePictures } = useLazyAsyncData("portfolio-profile-pictures", () => queryCollection("portfolioProfilePictures").all())
</script>

<template>
    <!-- TODO: on first page load pfps very tiny! -->
    <div v-if="!pending && !error && profilePictures" class="gap-8 grid grid-cols-1 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
        <PortfolioImageProfilePicture v-for="pfp in profilePictures" :key="pfp.id" :pfp="pfp" />
    </div>
    <div v-else-if="pending" />
    <div v-else>
        <p>Error loading profile pictures.</p>
    </div>
</template>
