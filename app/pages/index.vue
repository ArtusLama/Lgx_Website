<template>
    <div>
        <p>Welcome!</p>
        <UiButton>Test Button</UiButton>

        <div class="h-[200vh] flex flex-col justify-between">
            <p v-for="value in 40" :key="value">
                {{ "lol haha ".repeat(value) }}
            </p>
        </div>
    </div>
</template>
