<template>
    <div>
        <!-- TODO: make default layout -->
        <NavBar />

        <main class="mt-[var(--spacing-navbar-height)] min-h-[calc(100vh-var(--spacing-navbar-height))] relative z-10 overflow-x-hidden">
            <slot />
        </main>

        <Footer />
    </div>
</template>
