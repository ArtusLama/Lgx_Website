<script setup lang="ts">
const { pending, error, data: partners } = useLazyAsyncData("partners", () => queryCollection("partners").all())
</script>

<template>
    <div v-if="!pending && !error && partners" class="gap-12 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <SectionPartnersPartnerCard v-for="partner in partners" :key="partner.name" :partner="partner" />
    </div>
    <div v-else-if="pending" />
    <div v-else>
        <p>Error loading partners.</p>
    </div>
</template>
