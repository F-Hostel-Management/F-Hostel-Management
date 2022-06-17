export interface IInvoiceProps {
    roomId: string
    paymentDate: number
    invoiceType: string
    price: number
    content: string
    quantity: number
    unitPrice: number
    createDate: number | string
    overdueDays: number
    cron: string
    [key: string]: any
}
