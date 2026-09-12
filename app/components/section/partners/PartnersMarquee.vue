<script setup lang="ts">
const { data: partners } = useLazyAsyncData("partner-marquee", () => queryCollection("partners").all())

const marqueePartners = computed(() => (partners.value ?? []).filter(partner => partner.marqueeLogo))
</script>

<template>
    <section
        v-if="marqueePartners.length"
        aria-label="Partners"
        class="py-6 border-y border-foreground/10 bg-foreground/[.03] overflow-hidden"
    >
        <div class="partner-marquee__viewport">
            <div class="partner-marquee__track">
                <div class="partner-marquee__set">
                    <a
                        v-for="partner in marqueePartners"
                        :key="`primary-${partner.name}`"
                        :href="partner.link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="partner-marquee__logo"
                    >
                        <NuxtImg
                            :src="partner.marqueeLogo!.url"
                            :alt="partner.marqueeLogo!.alt"
                            loading="lazy"
                            class="pointer-events-none select-none"
                        />
                    </a>
                </div>

                <div class="partner-marquee__set" aria-hidden="true">
                    <a
                        v-for="partner in marqueePartners"
                        :key="`duplicate-${partner.name}`"
                        :href="partner.link.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        tabindex="-1"
                        class="partner-marquee__logo"
                    >
                        <NuxtImg
                            :src="partner.marqueeLogo!.url"
                            alt=""
                            loading="lazy"
                            class="pointer-events-none select-none"
                        />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.partner-marquee__viewport {
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.partner-marquee__track {
    display: flex;
    width: max-content;
    animation: partner-marquee 32s linear infinite;
}

.partner-marquee__set {
    display: flex;
    align-items: center;
    gap: 4rem;
    padding-right: 4rem;
}

.partner-marquee__logo {
    display: flex;
    width: 12rem;
    height: 3.5rem;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    opacity: 0.42;
    filter: grayscale(1);
    transition: opacity 300ms ease, filter 300ms ease;
}

.partner-marquee__logo:hover,
.partner-marquee__logo:focus-visible {
    opacity: 0.85;
    filter: grayscale(0);
}

.partner-marquee__logo img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

@keyframes partner-marquee {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .partner-marquee__track {
        animation-play-state: paused;
    }
}

@media (max-width: 640px) {
    .partner-marquee__set {
        gap: 2.5rem;
        padding-right: 2.5rem;
    }

    .partner-marquee__logo {
        width: 9rem;
        height: 2.75rem;
    }
}
</style>
