import { IRoom } from './room'
import { ECommitmentStatus } from '../utils/enums'
import { IUser } from './user'

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
