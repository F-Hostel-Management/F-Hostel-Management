import { ERole } from '../../utils/enums'

export interface IInformation {
    role?: ERole
    name?: string
    email?: string
    phone?: string
    cardNumber?: string
    taxCode?: string
    dateOfBirth?: string
    gender?: number
    organization?: string
    avatarUrl?: string
}
export interface IProfileFormInfo {
    name?: string
    phone?: string
    cardNumber?: string
    taxCode?: string
    dateOfBirth?: string
    gender?: number
    organization?: string
}
