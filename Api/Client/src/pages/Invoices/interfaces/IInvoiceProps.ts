export interface IInvoiceProps {
    roomId: string
    dueDate: string
    invoiceType: string
    quantity: number
    lastQuantity: number
    unitPrice: number
    price: number
    content: string
    [key: string]: any
}
