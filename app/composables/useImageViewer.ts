export interface ImageViewerImage {
    src: string
    alt?: string
}

export default function () {
    const isOpen = useState<boolean>("image-viewer-open", () => false)
    const image = useState<ImageViewerImage | null>("image-viewer-image", () => null)

    function open(payload: ImageViewerImage) {
        image.value = payload
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

    return {
        isOpen,
        image,
        open,
        close,
    }
}
