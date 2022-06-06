import { IRoom } from './IRoom'
import { IUser } from './IUser'

export interface ICommitment {
    id?: string
    commitmentCode?: string
    createdDate?: string
    startDate?: string
    endDate?: string
    dateOverdue?: number
    compensation?: number
    status?: string
    commitmentStatus?: number
    commitmentScaffoldingId?: string
    commitmentScaffolding?: string
    managerId?: string
    manager?: IUser
    tenantId?: string
    tenant?: IUser
    ownerId?: string
    owner?: IUser
    roomId?: string
    room?: IRoom
    joiningCode?: string
    hostelId?: string
    isDeleted?: boolean
}

export interface ICommitmentValues {
    createdDate: string
    startDate: string
    endDate: string
    roomId: string
    overdueDays: number
    compensation: number
}
