export interface IInvoiceProps {
    roomId: string
    dueDate: string
    invoiceType: string
    price: number
    content: string
    quantity: number
    unitPrice: number
    [key: string]: any
}
