import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: [
        "@nuxt/eslint",
        "@nuxtjs/stylelint-module",
        "shadcn-nuxt",
        "lenis/nuxt",
        "@nuxt/hints",
        "@nuxt/icon",
        "@nuxt/fonts",
        "@nuxt/a11y",
        "@vueuse/nuxt",
        "@nuxtjs/seo",
        "@nuxtjs/html-validator",
        "@nuxt/image",
        "vue3-carousel-nuxt",
        "@nuxt/content",
        "nuxt-studio",
    ],

    eslint: {
        config: {
            stylistic: true,
        },
    },

    css: ["~/assets/css/tailwind.css"],
    vite: {
        plugins: [
            // @ts-expect-error - Can be safely ignored as the plugin is compatible with Nuxt!
            tailwindcss(),
        ],
    },

    fonts: {
        families: [
            { name: "Gantelline Signature", src: "/fonts/GantellineSignature.ttf" },
        ],
    },

    carousel: {
        prefix: "Carousel",
    },

    studio: {
        route: "/admin",
        repository: {
            provider: "github",
            owner: "ArtusLama",
            repo: "Lgx_Website",
            branch: "main",
        },
    },

    /*
    nitro: {
        prerender: {
            routes: ["/", "/shop"],
            crawlLinks: true,
        },
    }, */
})
