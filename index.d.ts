import type { gsap } from "gsap"
import type { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import type { ScrollTrigger } from "gsap/ScrollTrigger"
import type { SplitText } from "gsap/SplitText"

declare module "#app" {
    interface NuxtApp {
        $gsap: typeof gsap
        $ScrollTrigger: typeof ScrollTrigger
        $SplitText: typeof SplitText
        $DrawSVGPlugin: typeof DrawSVGPlugin
    }
}

declare module "vue" {
    interface ComponentCustomProperties {
        $gsap: typeof gsap
        $ScrollTrigger: typeof ScrollTrigger
        $SplitText: typeof SplitText
        $DrawSVGPlugin: typeof DrawSVGPlugin
    }
}

declare module "nuxt/schema" {
    interface RuntimeConfig {
        youtubeApiKey: string
        recaptcha: {
            secretKey: string
        }
        discordContactWebhookUrl: string
    }

    interface PublicRuntimeConfig {
        recaptcha: {
            siteKey: string
        }
    }
}

export {}
