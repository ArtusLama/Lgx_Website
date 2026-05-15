<template>
    <div>
        <!-- TODO: make default layout -->
        <NavBar />

        <main class="mx-auto px-4 max-w-120rem min-h-[calc(100vh-var(--spacing-navbar-height))] relative overflow-x-hidden md:px-12 xl:px-24">
            <slot />
        </main>

        <Footer />
    </div>
</template>
