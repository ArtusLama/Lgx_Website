<script setup lang="ts">
withDefaults(defineProps<{
    partner: Partner
    featured?: boolean
}>(), {
    featured: false,
})
</script>

<template>
    <article
        class="group border border-foreground/15 rounded-xl bg-background flex flex-col min-h-92 shadow-sm transition-all duration-500 relative overflow-hidden hover:border-primary/35 hover:shadow-md hover:-translate-y-2"
        :class="featured ? 'md:col-span-2 md:min-h-104' : ''"
    >
        <div class="p-6 flex flex-1 flex-col sm:p-8">
            <div class="mb-8 rounded-lg bg-background flex h-32 items-center justify-center overflow-hidden sm:h-40">
                <NuxtImg
                    :src="partner.logo.url"
                    :alt="partner.logo.alt"
                    class="max-h-24 max-w-[75%] transition-transform duration-500 object-contain sm:max-h-28 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <h3 class="text-2xl text-foreground tracking-tight font-black sm:text-3xl">
                {{ partner.name }}
            </h3>
            <p class="text-foreground/65 leading-relaxed mt-3">
                {{ partner.description }}
            </p>

            <a
                :href="partner.link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-primary tracking-wide font-bold mt-8 underline-hover-anim flex gap-2 w-fit uppercase items-center"
            >
                {{ partner.link.label }}
                <Icon name="lucide:arrow-right" :size="18" class="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
        </div>
    </article>
</template>
