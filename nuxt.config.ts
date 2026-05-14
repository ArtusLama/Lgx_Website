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
    ],

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

    // TODO: Maybe prerender some routes
    /* nitro: {
        prerender: {
            routes: ["/"],
            crawlLinks: true,
        },
    }, */
})
