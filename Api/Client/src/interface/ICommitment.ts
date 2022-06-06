import { IRoom } from './IRoom'
import { ECommitmentStatus } from '../utils/enums'
import { IUser } from './IUser'

export interface ICommitment {
    id: string
    commitmentCode: string
    createdDate: string
    startedDate: string
    endDate: string
    details: {
        manager: IUser
        tenant: IUser
        terms: {
            room: IRoom
            overdueDays: number
            fine: number
        }
    }
    status: ECommitmentStatus
}

export interface ICommitmentValues {
    createDate: string
    startDate: string
    endDate: string
    roomId: string
    overdueDays: number
    compensation: number
}
