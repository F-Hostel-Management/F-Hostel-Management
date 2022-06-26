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
    commitmentScaffoldingId?: string
    commitmentScaffolding?: string
    managerId?: string
    manager?: IUser
    ownerId?: string
    owner?: IUser
    roomId?: string
    room?: IRoom
    joiningCode?: string
    sixDigitsCode?: string
    hostelId?: string
    hostel?: IHostel
    isDeleted?: boolean
    price?: number
    paymentDate?: number
}

export interface ICommitmentValues {
    startDate: string
    endDate: string
    roomId: string
    price: number
    paymentDate: number
    images?: File[]
    [x: string | number | symbol]: unknown
}
