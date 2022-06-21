import { IRoom } from './IRoom'
import { IUser } from './IUser'
export interface IHostel {
    id?: string
    address?: string
    name?: string
    numOfRooms?: number
    hostelCategoryId?: string
    hostelCategory?: any
    hostelManagements?: any
    ownerId?: string
    owner?: IUser
    tenant?: IUser[]
    imgPath?: string
    rooms?: IRoom[]
    isDeleted?: boolean
    [x: string | number | symbol]: any
}

export interface IHostelValues {
    address?: string
    name?: string
    ownerId?: string
    imgPath?: string
    image?: File
    [x: string | number | symbol]: any
}
