export interface IFacility {
    id: string
    name: string
    type: string
    hostelId: string
    price: number
    quantity: number
    numberSelected?: number
    description?: string
}

export interface IFacilityValues {
    type: string
    name: string
    price: number
    quantity: number
    hostelId: string
    [x: string | number | symbol]: any
}

export interface IFacilityDescription {
    quantity: number
    details: string
    [x: string | number | symbol]: any
}

export interface IFacilityManagement {
    facility: IFacility
    quantity: number
    description: string
    roomId: string
    facilityId: string
    id: string
    isDeleted: boolean
    [x: string | number | symbol]: any
}
