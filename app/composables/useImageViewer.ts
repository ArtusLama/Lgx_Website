export interface ImageViewerImage {
    src: string
    alt?: string
}

export interface ImageViewerPayload {
    images: ImageViewerImage[]
    startIndex?: number
}

type ImageViewerOpenPayload = ImageViewerPayload | ImageViewerImage | ImageViewerImage[]

export default function () {
    const isOpen = useState<boolean>("image-viewer-open", () => false)
    const images = useState<ImageViewerImage[]>("image-viewer-images", () => [])
    const activeIndex = useState<number>("image-viewer-index", () => 0)

    function normalizePayload(payload: ImageViewerOpenPayload): ImageViewerPayload {
        if (Array.isArray(payload)) {
            return { images: payload, startIndex: 0 }
        }

        if ("images" in payload) {
            return { images: payload.images, startIndex: payload.startIndex ?? 0 }
        }

        return { images: [payload], startIndex: 0 }
    }

    function open(payload: ImageViewerOpenPayload) {
        const { images: nextImages, startIndex } = normalizePayload(payload)

        if (!nextImages.length)
            return

        images.value = nextImages
        activeIndex.value = Math.min(Math.max(startIndex ?? 0, 0), nextImages.length - 1)
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
    }

    return {
        isOpen,
        images,
        activeIndex,
        open,
        close,
    }
}
