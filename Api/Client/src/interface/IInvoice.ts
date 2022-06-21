import { IRoom } from './IRoom'
import { IUser } from './IUser'

export interface IInvoice {
    id?: string
    invoiceCode?: string
    quantity?: number
    unitPrice?: number
    price?: number
    date?: string
    dueDate?: string
    invoiceType?: string
    content?: string
    room?: IRoom
    manager?: IUser
    tenantPaid?: IUser
    isDeleted?: boolean
}

export interface IInvoiceSchedule {
    id?: string
    price?: number
    cron?: string
    createDate?: number
    paymentDate?: number
    invoiceType?: string
    content?: string
    room?: IRoom
    manager?: IUser
    isDeleted?: boolean
}
