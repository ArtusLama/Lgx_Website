<template>
    <div>
        <!-- TODO: make default layout -->
        <NavBar />

        <main class="mt-[var(--spacing-navbar-height)] min-h-[calc(100vh-var(--spacing-navbar-height))] relative overflow-x-hidden">
            <slot />
        </main>

        <Footer />
    </div>
</template>
