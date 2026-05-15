<template>
    <div>
        <p>INDEX CONTENT</p>

        <div class="m-8 flex flex-wrap gap-8">
            <UiButton>
                Test Text
            </UiButton>

            <UiButton variant="secondary">
                Shop
            </UiButton>

            <UiButton variant="outline">
                Outline
            </UiButton>

            <UiButton icon>
                <Icon name="lucide:shopping-cart" />
                Test Text
            </UiButton>

            <UiButton variant="secondary" icon>
                <Icon name="lucide:shopping-cart" />
                Shop
            </UiButton>

            <UiButton variant="outline" icon>
                <Icon name="lucide:shopping-cart" />
                Outline
            </UiButton>
        </div>

        <div class="mt-20">
            <p v-for="i in 20" :key="i" class="text-red-500 font-black mb-10 mt-20">
                {{ 'Hello World!'.repeat(i) }}
            </p>
        </div>
        <!-- TODO: Make actual page lol -->
    </div>
</template>
