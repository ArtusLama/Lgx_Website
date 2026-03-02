<template>
    <SectionHeroWrapper class="relative m-12 h-160 w-300 mx-auto">
        <div class="text-center flex flex-col items-center">
            <SvgHeoSignature class="h-16 w-fit -mb-8 z-10 *:fill-primary" />
            <h2 class="text-white uppercase font-black text-7xl">
                All growth<br>
                takes time
            </h2>
        </div>
        <div class="flex justify-between px-32">
            <SectionHeroLinksList
                title="Design"
                :links="[
                    { label: 'Portfolio', scrollTo: '#' },
                    { label: 'Reviews', scrollTo: '#' },
                    { label: 'Commissions', scrollTo: '#' },
                    { label: 'Pricing', scrollTo: '#' },
                ]"
            />

            <NuxtImg src="/imgs/HeroSectionSkinRender.png" class="pointer-events-none select-none absolute -bottom-20 left-1/2 -translate-x-1/2" />

            <SectionHeroLinksList
                title="Contact"
                :links="[
                    { label: 'YouTube', href: '#' },
                    { label: 'Discord', href: '#' },
                    { label: 'Ko-fi', href: '#' },
                    { label: 'Partners', href: '#' },
                ]"
            />
        </div>
    </SectionHeroWrapper>
</template>
