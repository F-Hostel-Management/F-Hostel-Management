import { IRoom } from './IRoom'
export interface IHostel {
    id?: string
    address?: string
    name?: string
    numOfRooms?: number
    hostelCategoryId?: string
    hostelCategory?: any
    hostelManagements?: any
    ownerId?: string
    imgPath?: string
    rooms?: IRoom[]
    isDeleted?: boolean
}

export interface IHostelValues {
    address?: string
    name?: string
    numOfRooms?: number
    hostelCategoryId?: string
    ownerId?: string
    imgPath?: string
    image?: any
}
