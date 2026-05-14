<template>
    <div>
        <!-- TODO: make default layout -->
        <NavBar />

        <main class="min-h-[calc(100vh-var(--spacing-navbar-height))] relative">
            <slot />
        </main>

        <Footer />
    </div>
</template>
