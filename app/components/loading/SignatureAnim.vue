<script setup lang="ts">
const signature = useTemplateRef<SVGElement>("signature")
onMounted(() => {
    if (signature.value) {
        const path = signature.value.querySelector("path")
        if (path) {
            const length = path.getTotalLength()
            path.style.strokeDasharray = length.toString()
            path.style.strokeDashoffset = length.toString()

            path.animate([
                { strokeDashoffset: length.toString() },
                { strokeDashoffset: "0" },
            ], {
                duration: 1500,
                easing: "ease-in",
                fill: "forwards",
            })
        }
    }
})
</script>

<template>
    <div>
        <svg ref="signature" class="signature-anim stroke-black w-80" width="979" height="446" viewBox="0 0 979 446" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0024 232.738C57.1691 246.905 147.602 259.938 132.002 198.738C112.502 122.238 201.002 -103.762 242.502 80.7385C284.002 265.238 175.502 267.739 202.502 336.239C229.502 404.739 348.502 429.239 452.002 321.739C555.502 214.239 530.002 112.239 535.502 103.239C541.002 94.2385 479.502 32.2385 590.502 90.2385C701.502 148.239 840.002 205.739 705.502 214.239C571.002 222.739 450.502 177.239 385.502 163.739C320.502 150.239 -85.9976 -29.2615 330.502 156.239C747.002 341.739 808.002 569.239 809.002 336.239C810.002 103.239 689.502 38.2385 796.502 52.7385C903.502 67.2385 952.002 123.239 968.502 139.739" stroke-width="20" stroke-linecap="round" />
        </svg>
    </div>
</template>
