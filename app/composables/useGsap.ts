export default function () {
    const nuxtApp = useNuxtApp()

    return {
        gsap: nuxtApp.$gsap,
        ScrollTrigger: nuxtApp.$ScrollTrigger,
        SplitText: nuxtApp.$SplitText,
        DrawSVGPlugin: nuxtApp.$DrawSVGPlugin,
    }
}
