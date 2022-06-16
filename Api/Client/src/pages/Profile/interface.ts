import { ERole } from '../../utils/enums'

export interface IInformation {
    role?: ERole
    name?: string
    email?: string
    phone?: string
    cardNumber?: string
    taxCode?: string
    dateOfBirth?: string
    gender?: string
    organization?: string
    avatarUrl?: string
    frontIdentification?: string
    backIdentification?: string
}
export interface IProfileFormInfo {
    name?: string
    phone?: string
    cardNumber?: string
    taxCode?: string
    dateOfBirth?: string
    gender?: string
    organization?: string
    citizenIdentity?: number
    address?: string
    frontIdentification?: string
    backIdentification?: string
}
