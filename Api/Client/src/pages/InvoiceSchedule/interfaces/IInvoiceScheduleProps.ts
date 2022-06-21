export interface IInvoiceScheduleProps {
    roomId: string
    invoiceType: string
    price: number
    content: string
    cron: string
    createDate: number
    paymentDate: number
    [key: string]: any
}
