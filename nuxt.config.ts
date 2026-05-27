// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    modules: [
        // Appearance
        "reka-ui/nuxt",
        "@unocss/nuxt",
        "@nuxt/icon",
        "@nuxt/fonts",
        "lenis/nuxt",
        "vue3-carousel-nuxt",

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
        "nuxt-studio",

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
        families: [
            {
                name: "Plus Jakarta Sans",
                provider: "google",
                weights: ["200 800"],
                styles: ["normal", "italic"],
            },
        ],
    },

    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
            // Disable dark mode for now to avoid issues with darkreader.
            meta: [
                {
                    name: "darkreader-lock",
                },
            ],
        },
    },

    site: {
        // DEV VALUES -> Override site defaults using environment variables - see .env.example
        url: "http://localhost:3000",
        name: "Raspocket Studios",
        env: "development",
    },

    studio: {
        // for local testing disable 'dev' to simulate production environment.
        dev: true,

        route: "/admin",
        repository: {
            provider: "github",
            owner: "ArtusLama",
            repo: "Lgx_Website",
            branch: "main",
        },

        editor: {
            iconLibraries: ["simple-icons", "lucide"],
        },

        git: {
            commit: {
                messagePrefix: ":memo: Update content:",
            },
        },
    },

    // TODO: is this necessary and correct?! Suggested by logs
    vite: {
        optimizeDeps: {
            include: [
                "@vue/devtools-kit",
                "gsap",
                "gsap/DrawSVGPlugin",
                "gsap/ScrollTrigger",
                "gsap/SplitText",
            ],
        },
    },

    runtimeConfig: {
        youtubeApiKey: "", // Set in .env using: NUXT_YOUTUBE_API_KEY=...
    },

    image: {
        domains: [
            "yt3.ggpht.com",
            "yt3.googleusercontent.com",
            "i.ytimg.com",
        ],
    },

    content: {
        experimental: {
            // TODO: hopefully this fixes vercel deployment issues => https://github.com/nuxt/content/issues/3534
            sqliteConnector: "native",
        },
    },

    carousel: {
        prefix: "Carousel",
    },

    // TODO: Maybe prerender some routes. Also check if this works with content
    /* nitro: {
        prerender: {
            routes: ["/"],
            crawlLinks: true,
        },
    }, */
})
