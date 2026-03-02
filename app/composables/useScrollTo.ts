export default function (id: string) {
    const target: HTMLElement | null = document.getElementById(id)

    if (!target) {
        console.warn(`Element with id "${id}" not found.`)
        return
    }

    const computedStyle = getComputedStyle(target)
    const scrollMarginTop = Number.parseFloat(computedStyle.scrollMarginTop) || 0
    const scrollPaddingTop = Number.parseFloat(computedStyle.scrollPaddingTop) || 0
    const offset = scrollMarginTop + scrollPaddingTop

    useLenis().value?.scrollTo(target, {
        offset: -offset,
    })
}
