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
    tenantId?: string
    ownerId?: string
    roomId?: string
    joiningCode?: string
    isDeleted?: boolean
}

export interface ICommitmentValues {
    createDate: string
    startDate: string
    endDate: string
    roomId: string
    overdueDays: number
    compensation: number
}
