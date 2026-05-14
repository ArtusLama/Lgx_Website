<template>
    <div>
        <p v-for="i in 20" :key="i" class="text-red-500 font-black mb-10">
            {{ 'Hello World!'.repeat(i) }}
        </p>
        <!-- TODO: Make actual page lol -->
    </div>
</template>
