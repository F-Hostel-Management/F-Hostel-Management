import { ERoomStatus, ERoomType } from '../utils/enums'

export interface IRoom {
    id?: string
    roomName?: string
    roomTypeId?: ERoomType
    numberOfWindows?: number
    numberOfDoors?: number
    numberOfBathRooms?: number
    numberOfWCs?: number
    price?: number
    area?: number
    length?: number
    width?: number
    height?: number
    hostelId?: string
    roomStatus?: ERoomStatus
    maximumPeople?: number
    isDeleted?: boolean
}
