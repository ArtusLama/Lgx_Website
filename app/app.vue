<script setup lang="ts">
// - - - - - - -  G S A P   A N D   S M O O T H   S C R O L L I N G  - - - - - - -

const lenisRef = useTemplateRef("lenis")
const { gsap, ScrollTrigger } = useGsap()

watchEffect((onInvalidate) => {
    if (!lenisRef.value?.lenis)
        return

    const lenis = lenisRef.value.lenis

    lenis.on("scroll", ScrollTrigger.update)

    function update(time: number) {
        lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)

    gsap.ticker.lagSmoothing(0)

    onInvalidate(() => {
        lenis.off("scroll", ScrollTrigger.update)
        gsap.ticker.remove(update)
    })
})

// - - - - - - - - - - - - - - - - - -   S E O  - - - - - - - - - - - - - - - - - -

useSeoMeta({
    titleTemplate: title => (title ? `${title} | Raspocket Studios` : "Raspocket Studios"),
    ogImage: "/imgs/ogImages/DefaultOgImage.png",
    twitterImage: "/imgs/ogImages/DefaultOgImage.png",
})

useSchemaOrg([
    defineOrganization({
        name: "Raspocket Studios",
        logo: "/imgs/PFP_lgx.png",
        sameAs: [
            "https://www.youtube.com/@Lgx__",
            "https://discord.gg/XJe4JHkQgz",
            "https://ko-fi.com/lgxgfx",
            "https://www.paypal.com/paypalme/raspocketstudios",
        ],
        email: "contact@lgx.art",
    }),
])
</script>

<template>
    <div class="text-foreground bg-background">
        <VueLenis
            ref="lenis"
            root
            :options="{
                duration: 1,
                autoToggle: true,
                autoRaf: false,
            }"
        />

        <NuxtRouteAnnouncer />
        <NuxtLoadingIndicator color="var(--colors-primary)" />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
