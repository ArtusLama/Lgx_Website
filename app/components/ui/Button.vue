<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { ButtonHTMLAttributes } from "vue"

interface Props extends PrimitiveProps {
    type?: ButtonHTMLAttributes["type"]
    variant?: "primary" | "secondary" | "outline"
    size?: "small" | "normal"
    icon?: boolean
    iconOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
    type: "button",
    variant: "primary",
    icon: false,
    iconOnly: false,
    size: "normal",
})

const variantStyles = computed(() => {
    switch (props.variant) {
        case "primary":
            return "bg-blue-500 text-white hover:bg-blue-600"
        case "secondary":
            return "bg-gray-500 text-white hover:bg-gray-600"
        case "outline":
            return "border border-blue-500 text-blue-500 hover:bg-blue-100"
        default:
            return ""
    }
})

const iconStyles = computed(() => {
    return props.icon ? "flex items-center gap-2" : ""
})

const sizeStyles = computed(() => {
    switch (props.size) {
        case "small":
            return `${props.iconOnly ? "p-2" : "px-3 py-1.5"} text-xs`
        case "normal":
            return props.iconOnly ? "p-3" : "px-4 py-2"
        default:
            return ""
    }
})
</script>

<template>
    <Primitive
        class="rounded-md transition-all duration-200 active:scale-98 hover:scale-103"
        data-slot="button"
        :data-variant="variant"
        :as="as"
        :as-child="asChild"
        :class="[variantStyles, iconStyles, sizeStyles]"
        :type="type"
    >
        <slot />
    </Primitive>
</template>
