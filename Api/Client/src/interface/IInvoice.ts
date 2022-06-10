import { EInvoiceStatus } from '../utils/enums'

export interface IInvoice {
    id: string
    invoiceCode: string
    createDate: string
    paymentTerm: string
    type: number
    price: number
    content: string
    isDeleted: boolean
    status: EInvoiceStatus
}
