<script setup lang="ts">
import type { TabsListProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { TabsIndicator, TabsList } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<TabsListProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
    <TabsList
        data-slot="tabs-list"
        v-bind="delegatedProps"
        :class="cn(
            'bg-background border border-background-secondary/50 shadow-xs text-muted-foreground relative inline-flex h-10 w-fit items-center justify-center gap-1 rounded-xl p-1',
            props.class,
        )"
    >
        <TabsIndicator
            aria-hidden="true"
            class="pointer-events-none absolute top-1 left-0 bottom-1 z-0 rounded-lg border-[1.5px] border-primary transition-[transform,width] duration-200 ease-out"
            :style="{
                width: 'var(--reka-tabs-indicator-size)',
                transform: 'translateX(var(--reka-tabs-indicator-position))',
            }"
        />

        <slot />
    </TabsList>
</template>
