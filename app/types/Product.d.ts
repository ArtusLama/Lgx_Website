interface Product {
    id: string
    name: string
    tag?: string
    tagColor?: ProductTagColor
    description: string
    descriptionList?: string[]
    images: string[]
    price: number
    deliveryTime?: string
    shopUrl: string
}

type ProductTagColor = "primary" | "muted" | "destructive"
