import { IRole } from '../utils/enums'

export interface IUser {
    id: string
    role: IRole
    name: string
    email: string
    phone: string
    taxCode: string
    gender: number
    organization: string
    avatarUrl: string
    isDeleted: boolean
}

export interface IUserForm {
    name: string
    email: string
    phone: string
}
