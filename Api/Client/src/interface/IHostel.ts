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
    imgPath?: string
    rooms?: IRoom[]
    isDeleted?: boolean
}

export interface IHostelValues {
    address?: string
    name?: string
    ownerId?: string
    imgPath?: string
    image?: File
}
