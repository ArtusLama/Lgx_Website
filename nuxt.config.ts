// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: [
        // Appearance
        "@unocss/nuxt",
        "@nuxt/icon",
        "@nuxt/fonts",
        "lenis/nuxt",

        // Performance
        "@nuxt/image",

        // Code quality
        "@nuxt/hints",
        "@nuxt/a11y",
        "@artmizu/nuxt-prometheus",
        "@nuxtjs/html-validator",
        "@nuxt/eslint",

        // CMS / Content
        "@nuxt/content",

        // SEO
        "@nuxtjs/seo",

        // Utility
        "@vueuse/nuxt",
    ],

    // Include UnoCSS reset (Tailwind v4) => https://unocss.dev/guide/style-reset
    css: ["@unocss/reset/tailwind-v4.css"],

    eslint: {
        config: {
            stylistic: true,
        },
    },

    fonts: {
        families: [],
    },

    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
        },
    },

    site: {
        // DEV VALUES -> Override site defaults using environment variables - see .env.example
        url: "http://localhost:3000",
        name: "Raspocket Studios",
        env: "development",
    },

    // TODO: Maybe prerender some routes
    /* nitro: {
        prerender: {
            routes: ["/"],
            crawlLinks: true,
        },
    }, */
})
