import { VueReCaptcha } from "vue-recaptcha-v3"

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    nuxtApp.vueApp.use(VueReCaptcha, {
        loaderOptions: {
            autoHideBadge: true,
            useEnterprise: true,
        },
        siteKey: config.public.recaptcha.siteKey,
    })
})
