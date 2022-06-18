import { IRoom } from './IRoom'
import { IUser } from './IUser'

export interface IInvoice {
    id?: string
    invoiceCode?: string
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
    invoiceCode?: string
    price?: number
    date?: string
    paymentDate?: number
    invoiceType?: string
    content?: string
    room?: IRoom
    manager?: IUser
    tenantPaid?: IUser
    isDeleted?: boolean
    cron?: string
}
