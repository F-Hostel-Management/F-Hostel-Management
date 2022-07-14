import { ICommitmentImages } from './ICommitmentImages'
import { IHostel } from './IHostel'
import { IRoom } from './IRoom'
import { IUser } from './IUser'

export interface ICommitment {
    id?: string
    commitmentCode?: string
    createdDate?: string
    startDate?: string
    endDate?: string
    status?: string
    commitmentStatus?: number
    manager?: IUser
    owner?: IUser
    room?: IRoom
    roomId?: string
    joiningCode?: string
    sixDigitsCode?: string
    hostelId?: string
    hostel?: IHostel
    price?: number
    paymentDate?: number
    images?: ICommitmentImages[]
}

export interface ICommitmentValues {
    startDate: string
    endDate: string
    roomId: string
    price: number
    paymentDate: number
    images?: Array<File | null>
    deletedImg?: string[]
    electric?: number
    water?: number
    [x: string | number | symbol]: unknown
}
