import { IInvoice } from '../../../interface/IInvoice'

export const compareDateInvoiceFunction = (
    invoiceX: IInvoice,
    invoiceY: IInvoice
) => {
    const dateX = new Date(invoiceX?.date ?? '').getTime()
    const dateY = new Date(invoiceY?.date ?? '').getTime()

    return dateY - dateX
}
