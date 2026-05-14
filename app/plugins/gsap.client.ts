import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

export default defineNuxtPlugin(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)

    return {
        provide: {
            gsap,
            ScrollTrigger,
            SplitText,
            DrawSVGPlugin,
        },
    }
})
