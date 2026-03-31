<script setup lang="ts">
const props = defineProps<{
    thumbnail: string
    uneditedTumbnail?: string
    shortDescription?: string
}>()
const emit = defineEmits<{
    preview: []
}>()

const showUnedited = ref(false)

const revealStyle = computed(() => ({
    clipPath: showUnedited.value ? "circle(0% at 100% 0%)" : "circle(150% at 100% 0%)",
    filter: showUnedited.value ? "blur(3px)" : "blur(0px)",
    transition: "clip-path 420ms cubic-bezier(0.22, 1, 0.36, 1), filter 300ms ease-out",
    willChange: "clip-path, filter",
}))

function toggleShift() {
    if (!props.uneditedTumbnail) {
        return
    }

    showUnedited.value = !showUnedited.value
}

function openPreview() {
    emit("preview")
}
</script>

<template>
    <div
        class="overflow-hidden rounded-lg relative group cursor-pointer"
        role="button"
        tabindex="0"
        @click="openPreview"
        @keydown.enter.self.prevent="openPreview"
        @keydown.space.self.prevent="openPreview"
    >
        <div class="relative overflow-hidden">
            <NuxtImg
                :src="uneditedTumbnail || thumbnail"
                :alt="shortDescription || 'Unedited gallery thumbnail image'"
                class="w-full h-full object-cover"
            />
            <NuxtImg
                v-if="uneditedTumbnail"
                :src="thumbnail"
                :alt="shortDescription || 'Gallery thumbnail image'"
                class="w-full h-full object-cover absolute inset-0"
                :style="uneditedTumbnail ? revealStyle : undefined"
            />
        </div>
        <UiButton
            v-if="uneditedTumbnail"
            variant="secondary"
            size="sm"
            class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
            :aria-label="showUnedited ? 'Show concept' : 'Show original'"
            @click.stop="toggleShift"
            @keydown.enter.stop
            @keydown.space.stop
        >
            <Icon :name="showUnedited ? 'lucide:eye-off' : 'lucide:eye'" />
            <span class="text-sm">{{ showUnedited ? "Show Original" : "Show Concept" }}</span>
        </UiButton>
    </div>
</template>
