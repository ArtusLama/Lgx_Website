<script setup lang="ts">
const reviews = [
    {
        imgUrl: "https://i.pinimg.com/736x/18/88/db/1888dbfd156722944399fa530be519c9.jpg",
        channel: {
            name: "BBlocks",
            url: "https://www.youtube.com/@BBlocks",
        },
        subscribers: "3.8M",
        quote: "Highly recommended, was reliable and fast, was made to amazing quality.",
    },
    {
        imgUrl: "https://i.pinimg.com/564x/fd/8f/ca/fd8fca8a715fa1b712b76f9221564f51.jpg",
        channel: {
            name: "Clevoo",
            url: "https://www.youtube.com/@Clevoo",
        },
        subscribers: "2.2M",
        quote: "Highly recommend, thumbnails are extremely high quality and delivered really fast, would definitely recommend!",
    },
    {
        imgUrl: "https://mir-s3-cdn-cf.behance.net/projects/404/c65f3f126211171.Y3JvcCw5OTksNzgyLDAsNw.png",
        channel: {
            name: "Carpyy",
            url: "https://www.youtube.com/@Carpyy",
        },
        subscribers: "290.000",
        quote: "The thumbnail is very polished, the delivery was quick, and the overall structure is impressive.",
    },
    {
        imgUrl: "https://i.pinimg.com/736x/18/88/db/1888dbfd156722944399fa530be519c9.jpg",
        channel: {
            name: "Bandisergio",
            url: "https://www.youtube.com/@Bandisergio",
        },
        subscribers: "280.000",
        quote: "This was my first time working with LGX and they have far exceeded all my expectations.",
    },
    {
        imgUrl: "https://i.pinimg.com/564x/fd/8f/ca/fd8fca8a715fa1b712b76f9221564f51.jpg",
        channel: {
            name: "Cyde",
            url: "https://www.youtube.com/@Cyde",
        },
        subscribers: "66.000",
        quote: "You send LGX a client GUI and LGX will return with a beautiful thumbnail somehow.",
    },
    {
        imgUrl: "https://mir-s3-cdn-cf.behance.net/projects/404/c65f3f126211171.Y3JvcCw5OTksNzgyLDAsNw.png",
        channel: {
            name: "Twixxel",
            url: "https://www.youtube.com/@Twixxel",
        },
        subscribers: "60.000",
        quote: "Amazing work! He finished my thumbnail in under a day, and it looks amazing! I highly recommend.",
    },
    {
        imgUrl: "https://i.pinimg.com/736x/18/88/db/1888dbfd156722944399fa530be519c9.jpg",
        channel: {
            name: "xFlxme",
            url: "https://www.youtube.com/@xFlxme",
        },
        subscribers: "51.000",
        quote: "LGX works insanely fast and always has creative & original ideas!",
    },
    {
        imgUrl: "https://i.pinimg.com/564x/fd/8f/ca/fd8fca8a715fa1b712b76f9221564f51.jpg",
        channel: {
            name: "ModernlegendsLP",
            url: "https://www.youtube.com/@ModernlegendsLP",
        },
        subscribers: "6.000",
        quote: "Thank you very much, that looks very good!",
    },
]
</script>

<template>
    <!-- TODO: GSAP: Appear -> slide up & fade + subs count animate up. Also maybe parallax?! -->
    <Section name="Trusted" class="grid grid-cols-[max-content_max-content_max-content] items-start justify-center gap-12">
        <SectionTrustedCard
            v-if="reviews[0]"
            v-bind="reviews[0]"
            class="justify-self-start self-end"
        />

        <div class="space-y-4 text-center flex flex-col items-center">
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
            v-for="(review, index) in reviews.slice(1)"
            :key="review.channel.name"
            v-bind="review"
            :class="[
                (index + 2) % 3 === 0
                    ? 'justify-self-start'
                    : (index + 2) % 3 === 1
                        ? 'justify-self-center'
                        : 'justify-self-end',
                index < 1 ? 'self-end' : 'self-start',
            ]"
        />
    </Section>
</template>
