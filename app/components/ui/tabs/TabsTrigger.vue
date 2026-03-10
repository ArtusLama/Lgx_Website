<script setup lang="ts">
import type { TabsTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TabsTrigger, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
    <TabsTrigger
        data-slot="tabs-trigger"
        :class="cn(
            'data-[state=active]:text-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground relative z-10 inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent px-4 py-1.75 text-sm font-semibold whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
            props.class,
        )"
        v-bind="forwardedProps"
    >
        <slot />
    </TabsTrigger>
</template>
