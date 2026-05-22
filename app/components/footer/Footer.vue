<script setup lang="ts">
const footer = useTemplateRef<HTMLElement>("footer")
const footerSpacer = useTemplateRef<HTMLElement>("footerSpacer")

onMounted(() => {
    const { gsap, ScrollTrigger } = useGsap()
    const footerEl = footer.value
    const spacerEl = footerSpacer.value

    if (!footerEl || !spacerEl)
        return

    const updateSpacerHeight = () => {
        spacerEl.style.height = `${footerEl.offsetHeight}px`
        ScrollTrigger.refresh()
    }

    updateSpacerHeight()

    const resizeObserver = new ResizeObserver(updateSpacerHeight)
    resizeObserver.observe(footerEl)

    gsap.set(footerEl, { yPercent: 40 })

    const parallaxTween = gsap.to(footerEl, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
            trigger: spacerEl,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
        },
    })

    onBeforeUnmount(() => {
        resizeObserver.disconnect()
        parallaxTween.scrollTrigger?.kill()
        parallaxTween.kill()
    })
})
</script>

<template>
    <div ref="footerSpacer" class="border-t-1 border-t-foreground/10 w-full" aria-hidden="true" />

    <footer ref="footer" class="px-4 pb-12 pt-20 flex w-full inset-x-0 bottom-0 justify-center fixed z-0 md:px-12 xl:px-24">
        <div class="max-w-120rem w-full">
            <div class="gap flex flex-col flex-wrap gap-12 items-center justify-between md:flex-row md:items-start">
                <div class="text-center flex flex-col items-center md:text-start md:items-start">
                    <p class="text-5xl tracking-wide font-black font-jakarta w-fit uppercase md:text-8xl sm:text-7xl xl:text-9xl">
                        RASPOCKET<br>
                        STUDIOS.
                    </p>
                    <p class="tracking-wider font-medium mt-4 uppercase">
                        DESIGN / QUALITY / EXPERIENCE
                    </p>

                    <div class="mt-6 flex gap-2 justify-center md:justify-start">
                        <FooterSocialIcon icon="simple-icons:youtube" href="https://www.youtube.com/@Lgx__" />
                        <FooterSocialIcon icon="simple-icons:discord" href="https://discord.gg/XJe4JHkQgz" />
                        <FooterSocialIcon icon="simple-icons:kofi" href="https://ko-fi.com/lgxgfx" />
                    </div>
                </div>
                <div class="mt-0 text-center flex flex-col gap-2 md:mt-8 md:text-start">
                    <p class="tracking-wider font-bold opacity-75 uppercase italic">
                        LINKS:
                    </p>
                    <ul class="text-lg flex flex-col gap-1 items-center *:(tracking-wider underline-hover-anim w-fit uppercase) md:items-start">
                        <li>
                            <NuxtLink to="/">
                                HOME
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/portfolio">
                                PORTFOLIO
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/contact">
                                CONTACT
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/partners">
                                MY PARTNERS
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/become-a-partner">
                                BECOME A PARTNER
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <hr class="text-foreground/25 mb-2 mt-20">

            <div class="flex flex-wrap gap-x-8 justify-between">
                <p>
                    &copy; {{ new Date().getFullYear() }} Raspocket Studios, All rights reserved.
                </p>
                <p>
                    Made by
                    <NuxtLink
                        class="underline-hover-anim"
                        external
                        to="https://arthur-paucke.de"
                        target="_blank"
                    >
                        Arthur P.
                    </NuxtLink>
                </p>
            </div>
        </div>
    </footer>
</template>
