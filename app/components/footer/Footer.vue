<template>
    <footer class="px-4 pb-12 pt-20 border-t-1 border-t-foreground/10 flex w-full justify-center md:px-12 xl:px-24">
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
                        <FooterSocialIcon icon="simple-icons:youtube" href="https://www.youtube.com/@Lgx__" color="#FF0000" />
                        <FooterSocialIcon icon="simple-icons:discord" href="https://discord.gg/XJe4JHkQgz" color="#7289da" />
                        <FooterSocialIcon icon="simple-icons:kofi" href="https://ko-fi.com/lgxgfx" color="#FF6433" />
                        <FooterSocialIcon icon="lucide:link" href="https://solo.to/lgx_" color="#256ff8" />
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
