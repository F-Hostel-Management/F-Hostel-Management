import { ERoomStatus, ERoomType } from '../utils/enums'

export interface IRoom {
    id?: string
    roomName?: string
    roomTypeId?: ERoomType
    numOfWindows?: number
    numOfDoors?: number
    numOfBathRooms?: number
    numOfWCs?: number
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
