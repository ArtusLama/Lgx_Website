export default function () {
    function toTop() {
        const lenis = useLenis().value
        if (lenis) {
            lenis.scrollTo(0)
        }
        else {
            console.warn("Lenis instance not found. Falling back to window.scrollTo")
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return {
        toTop,
    }
}
