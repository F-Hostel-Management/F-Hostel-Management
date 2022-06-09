export interface IInvoice {
    id: string
    invoiceCode: string
    type: number
    price: number
    cron: number
    content: string
    isDeleted: boolean
}
