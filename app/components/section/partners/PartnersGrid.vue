<script setup lang="ts">
const { pending, error, data: partners } = useLazyAsyncData("partners", () => queryCollection("partners").all())
</script>

<template>
    <div v-if="!pending && !error && partners" class="gap-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
        <SectionPartnersPartnerCard
            v-for="(partner, index) in partners"
            :key="partner.name"
            :partner="partner"
            :featured="index === 0"
        />
    </div>
    <div v-else-if="pending" />
    <div v-else>
        <p>Error loading partners.</p>
    </div>
</template>
