import { IInvoice } from '../interface/IInvoice'
import { getItem } from '../utils/LocalStorageUtils'
import { ODataCaller } from '../utils/ODataCaller'
import { RestCaller } from '../utils/RestCaller'

const { createBuilder, get } = ODataCaller

export const getNumberOfInvoice = async () => {
    const builder = createBuilder<IInvoice>().select('id')
    const result = await get('Invoices', builder)
    return result.length
}

export const getInvoices = async (
    pageSize: number,
    page: number
): Promise<IInvoice[]> => {
    const currentHostelId = getItem('currentHostelId')
    const builder = createBuilder<IInvoice>()
        .select(
            'id',
            'invoiceCode',
            'price',
            'date',
            'dueDate',
            'content',
            'invoiceType'
        )
        .expand('room', (q) => q.select('id', 'roomName', 'hostelId'))
        .expand('manager', (q) => q.select('id', 'name'))
        .expand('tenantPaid', (q) => q.select('id', 'name'))
        .paginate(pageSize, page)
    const result: IInvoice[] = await get('Invoices', builder)

    return result.filter(
        (invoice) => invoice.room?.hostelId === currentHostelId
    )
}

interface ICreateInvoiceParams {
    roomId: string
    invoiceType: string
    price: number
    content: string
    dueDate: Date
}
export const createInvoice = async ({
    roomId,
    invoiceType,
    price,
    content,
    dueDate,
}: ICreateInvoiceParams) => {
    await RestCaller.post(
        `Invoices/${roomId}`,
        {
            invoiceType,
            price,
            content,
            dueDate,
        },
        { loading: { show: true }, success: { show: true } }
    )
}

interface IUpdateInvoiceParams {
    id: string
    invoiceType: string
    price: number
    content: string
    dueDate: Date
}
export const updateInvoice = async ({
    id,
    invoiceType,
    price,
    content,
    dueDate,
}: IUpdateInvoiceParams) => {
    await RestCaller.put(
        `Invoices/${id}`,
        {
            invoiceType,
            price,
            content,
            dueDate,
        },
        { loading: { show: true }, success: { show: true } }
    )
}
