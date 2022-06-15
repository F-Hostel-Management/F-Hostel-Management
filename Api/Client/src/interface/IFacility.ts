export interface IFacility {
    id: string
    name: string
    type: string
    hostelId: string
    price: number
    quantity: number
}

export interface IFacilityValues {
    type: string
    name: string
    price: number
    quantity: number
    hostelId: string
}
