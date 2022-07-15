import { ERoomStatus } from '../utils/enums'
import { ICommitment } from './ICommitment'
import { IFacilityManagement } from './IFacility'
import { IHostel } from './IHostel'

export interface IRoom {
    id?: string
    roomName?: string
    numOfWindows?: number
    numOfDoors?: number
    numOfBedRooms?: number
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
    facilityManagements?: IFacilityManagement[]
    commitments?: ICommitment[]
    [x: string | number | symbol]: any
}

export interface IRoomValues {
    roomName: string
    quantity?: number
    maximumPeople: number
    numOfBedRooms: number
    numOfWindows: number
    numOfDoors: number
    numOfBathRooms: number
    numOfWCs: number
    area: number
    length: number
    width: number
    height: number
    hostelId: string
    [x: string | number | symbol]: any
}
