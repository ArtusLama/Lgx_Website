export default function () {
    const nuxtApp = useNuxtApp()

    return {
        gsap: nuxtApp.$gsap,
    }

    // TODO: Take a look at: https://medium.com/@diegohh0411/how-to-setup-gsap-in-nuxt-3-when-references-are-all-over-the-place-971dd19511fa
}
