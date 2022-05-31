import { ERoomStatus, ERoomType } from '../utils/enums'

export interface IRoom {
    id: string
    roomNumber: number
    type: ERoomType
    status: ERoomStatus
    numberOfWindows: number
    numberOfDoor: number
    numberOfBathRoom: number
    numberOfToilet: number
    price: number
    area: number
    length: number
    width: number
    height: number
    isDeleted: boolean
}
