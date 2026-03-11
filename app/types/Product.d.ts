interface Product {
    id: string
    name: string
    tag?: string
    tagColor?: ProductTagColor
    description: string
    descriptionList?: string[]
    images: string[]
    price: number
}

type ProductTagColor = "primary" | "muted" | "destructive"
