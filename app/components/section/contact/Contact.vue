<script setup lang="ts">
const preheading = useTemplateRef<HTMLParagraphElement>("preheading")
const heading = useTemplateRef<HTMLHeadingElement>("heading")

let cleanupAnimations = () => {}

onMounted(() => {
    const { gsap, SplitText } = useGsap()

    if (!preheading.value || !heading.value) {
        return
    }

    const preheadingSplit = new SplitText(preheading.value, { type: "words,chars" })
    const headingSplit = new SplitText(heading.value, { type: "words,chars" })

    const preheadingChars = preheadingSplit.chars
    const headingChars = headingSplit.chars

    gsap.set(preheading.value, {
        display: "inline-block",
        overflow: "hidden",
    })
    gsap.set(preheadingChars, { yPercent: 120 })
    gsap.set(headingChars, { opacity: 0 })

    const introTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
            trigger: heading.value,
            start: "top 80%",
            toggleActions: "play none none none",
        },
    })

    introTimeline
        .to(preheadingChars, {
            yPercent: 0,
            duration: 1.2,
            delay: 0.2,
            stagger: { each: 0.04, from: "start" },
        })
        .to(headingChars, {
            opacity: 1,
            duration: 1,
            stagger: { each: 0.05, from: "start" },
        }, "<0.25")

    cleanupAnimations = () => {
        introTimeline.scrollTrigger?.kill()
        introTimeline.kill()
        preheadingSplit.revert()
        headingSplit.revert()
    }
})

onBeforeUnmount(() => {
    cleanupAnimations()
})
</script>

<template>
    <Section secondary-background>
        <div class="gap-x-48 gap-y-16 grid w-full items-center xl:grid-cols-2">
            <div class="space-y-8">
                <div class="font-jakarta">
                    <p ref="preheading" class="text-xl text-primary tracking-wider font-black uppercase font-italic sm:text-3xl">
                        COMMISSIONS
                    </p>
                    <h2 ref="heading" class="text-5xl leading-[0.95] font-black sm:text-8xl">
                        Your next thumbnail
                        <br>
                        starts here.
                    </h2>
                </div>

                <p class="text-xl opacity-90 max-w-xl sm:text-2xl">
                    Send your idea and references, and I will design a custom thumbnail, banner, profile pic, or whatever you need to make your channel grow.
                </p>

                <div class="flex flex-wrap gap-2">
                    <SectionContactBadge>
                        Thumbnails
                    </SectionContactBadge>
                    <SectionContactBadge>
                        Banners
                    </SectionContactBadge>
                    <SectionContactBadge>
                        Profile Pics
                    </SectionContactBadge>
                    <SectionContactBadge>
                        Skins
                    </SectionContactBadge>
                    <SectionContactBadge>
                        Much More!
                    </SectionContactBadge>
                </div>

                <div class="gap-4 grid sm:grid-cols-3">
                    <SectionContactInfoCard
                        title="1. Contact"
                        description="Send your idea and references."
                        icon="lucide:message-circle"
                    />
                    <SectionContactInfoCard
                        title="2. Concept"
                        description="We confirm pricing and timing. Then the fun begins."
                        icon="lucide:clipboard-check"
                    />
                    <SectionContactInfoCard
                        title="3. Deliver"
                        description="Final art, ready to upload."
                        icon="lucide:sparkles"
                    />
                </div>
            </div>

            <div>
                <div class="p-6 border border-foreground-secondary/15 rounded-2xl bg-foreground-secondary/10 shadow-lg sm:p-8">
                    <p class="text-sm text-foreground-secondary/90 tracking-wider font-bold uppercase">
                        Start a commission
                    </p>
                    <h3 class="text-3xl font-black font-jakarta mt-2 sm:text-4xl">
                        Get a quick response on Discord.
                    </h3>
                    <p class="text-foreground-secondary/80 mt-4">
                        Discord is the fastest way to lock in a slot and align on details.
                    </p>

                    <div class="mt-6 p-4 pr-6 border border-foreground-secondary/10 rounded-xl bg-foreground-secondary/10 w-fit">
                        <div class="flex gap-4 items-center">
                            <NuxtImg
                                class="rounded-full size-12"
                                src="/imgs/DiscordProfilePicture.png"
                                loading="lazy"
                            />
                            <div>
                                <p class="text-sm tracking-wider font-bold">
                                    Lgx_
                                </p>
                                <p class="text-sm text-foreground-secondary/75">
                                    Send your idea and references, then I will reply with next steps.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex flex-wrap gap-3">
                        <UiButton as-child icon>
                            <NuxtLink
                                class="bg-[#7289da]! hover:bg-[#5b6eae]!"
                                external
                                target="_blank"
                                to="https://discord.gg/XJe4JHkQgz"
                            >
                                <Icon name="simple-icons:discord" />
                                Message on Discord
                            </NuxtLink>
                        </UiButton>
                        <UiButton as-child icon variant="outline">
                            <NuxtLink to="/shop">
                                <Icon name="lucide:shopping-cart" />
                                View commission menu
                            </NuxtLink>
                        </UiButton>
                    </div>

                    <p class="text-sm text-foreground-secondary/75 mt-4">
                        Want examples? See the
                        <NuxtLink to="/portfolio" class="font-semibold underline-hover-anim">
                            portfolio
                        </NuxtLink>
                    </p>
                </div>

                <SectionContactForm class="mt-4" />
            </div>
        </div>
    </Section>
</template>
