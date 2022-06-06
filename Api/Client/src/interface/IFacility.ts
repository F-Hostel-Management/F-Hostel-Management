import { EFacilityCategory } from '../utils/enums'

export interface IFacility {
    id: string
    facilityName: string
    category: EFacilityCategory
    price: number
    isDeleted: boolean
}
