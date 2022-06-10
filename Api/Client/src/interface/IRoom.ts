import { ERoomStatus, ERoomType } from '../utils/enums'
import { IHostel } from './IHostel'

export interface IRoom {
    id?: string
    roomName?: string
    roomTypeId?: ERoomType
    numOfWindows?: number
    numOfDoors?: number
    numOfBathRooms?: number
    numOfWCs?: number
    area?: number
    length?: number
    width?: number
    height?: number
    hostelId?: string
    hostel?: IHostel
    status?: ERoomStatus
    maximumPeople?: number
    isDeleted?: boolean
}

export interface IRoomValues {
    roomName?: string
    quantity?: number
    maximumPeople?: number
    numOfWindows?: number
    numOfDoors?: number
    numOfBathRooms?: number
    numOfWCs?: number
    area?: number
    length?: number
    width?: number
    height?: number
    roomTypeId?: string
    hostelId?: string
}
