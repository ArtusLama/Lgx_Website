<script setup lang="ts">
const { data: testimonials } = await useAsyncData("testimonials", () => {
    return queryCollection("testimonials")
        .order("sort", "ASC")
        .all()
})
</script>

<template>
    <!-- TODO: GSAP: Appear -> slide up & fade + subs count animate up. Also maybe parallax?! -->
    <Section v-if="testimonials" name="Trusted" class="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 md:items-start md:justify-items-start md:justify-center md:gap-8 lg:grid-cols-[max-content_max-content] lg:gap-10 2xl:grid-cols-[max-content_max-content_max-content] 2xl:gap-12">
        <div class="order-1 md:order-1 2xl:order-2 space-y-4 text-center md:text-left 2xl:text-center flex flex-col items-center md:items-start 2xl:items-center">
            <p class="text-5xl font-bold">
                Trusted by<br>
                <span class="text-6xl text-primary">
                    <span class="font-black">BIG</span>
                    Creators
                </span>
            </p>
            <p class="font-bold text-2xl max-w-100">
                I have worked with countless creators, from small channels up to 4 million subscribers!
            </p>
        </div>

        <SectionTrustedCard
            v-if="testimonials[0]"
            :channel="{
                name: testimonials[0].name,
                url: testimonials[0].channelUrl,
            }"
            :img-url="testimonials[0].channelProfilePicture"
            :subscribers="testimonials[0].subscribers"
            :quote="testimonials[0].message"
            class="order-2 md:order-2 2xl:order-1 md:justify-self-start md:self-end"
        />

        <SectionTrustedCard
            v-for="(review, index) in testimonials.slice(1)"
            :key="review.name"
            :channel="{
                name: review.name,
                url: review.channelUrl,
            }"
            :img-url="review.channelProfilePicture"
            :subscribers="review.subscribers"
            :quote="review.message"
            class="order-3 md:order-3" :class="[
                (index + 2) % 3 === 0
                    ? '2xl:justify-self-start'
                    : (index + 2) % 3 === 1
                        ? '2xl:justify-self-center'
                        : '2xl:justify-self-end',
                index < 1 ? '2xl:self-end' : '2xl:self-start',
            ]"
        />
    </Section>
</template>
