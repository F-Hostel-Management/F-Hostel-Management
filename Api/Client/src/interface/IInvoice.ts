import { EInvoiceStatus } from '../utils/enums'

export interface IInvoice {
    id?: string
    invoiceCode?: string
    roomName?: string
    createDate?: string | number
    dueDate?: string
    type?: string
    price?: number
    content?: string
    isDeleted?: boolean
    status?: EInvoiceStatus
    creator?: string
    cron?: string
    quantity?: number
    unitPrice?: number
    overdueDays?: number
    paymentDate?: number
}
