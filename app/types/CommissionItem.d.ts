interface CommissionItem {
    id: string
    title: string
    description: string
    priceRange: string
    diliveryTimeRange: string
    variants: CommissionVariant[]
    exampleImages: string[]
}
