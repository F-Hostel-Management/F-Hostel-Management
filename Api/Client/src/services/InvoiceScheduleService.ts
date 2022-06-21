import { IInvoiceSchedule } from '../interface/IInvoice'
import { getItem } from '../utils/LocalStorageUtils'
import { ODataCaller } from '../utils/ODataCaller'
import { RestCaller } from '../utils/RestCaller'

export const getNumberOfInvoiceSchedule = async () => {
    const builder = ODataCaller.createBuilder<IInvoiceSchedule>().select('id')
    const result = await ODataCaller.get('InvoiceSchedules', builder)
    return result.length
}

export const getInvoiceSchedules = async (
    pageSize: number,
    page: number
): Promise<IInvoiceSchedule[]> => {
    const currentHostelId = getItem('currentHostelId')

    const builder = ODataCaller.createBuilder<IInvoiceSchedule>()
        .select(
            'id',
            'price',
            'cron',
            'createDate',
            'paymentDate',
            'invoiceType',
            'content'
        )
        .expand('room', (q) => q.select('id', 'roomName', 'hostelId'))
        .expand('manager', (q) => q.select('id', 'name'))
        .paginate(pageSize, page)
    const result: IInvoiceSchedule[] = await ODataCaller.get(
        'InvoiceSchedules',
        builder
    )

    return result.filter(
        (invoice) => invoice.room?.hostelId === currentHostelId
    )
}

interface ICreateInvoiceScheduleParams {
    roomId: string
    price: number
    cron: string
    createDate: number
    paymentDate: number
    content: string
    invoiceType: string
}
export const createInvoiceSchedule = async ({
    roomId,
    price,
    cron,
    createDate,
    paymentDate,
    content,
    invoiceType,
}: ICreateInvoiceScheduleParams) => {
    await RestCaller.post(
        `InvoiceSchedules/${roomId}`,
        {
            invoiceType,
            cron,
            createDate,
            paymentDate,
            price,
            content,
        },
        { loading: { show: true }, success: { show: true } }
    )
}

interface IUpdateInvoiceScheduleParams {
    id: string
    price: number
    cron: string
    createDate: number
    paymentDate: number
    content: string
    invoiceType: string
}
export const updateInvoiceSchedule = async ({
    id,
    price,
    cron,
    createDate,
    paymentDate,
    content,
    invoiceType,
}: IUpdateInvoiceScheduleParams) => {
    await RestCaller.put(
        `InvoiceSchedules/${id}`,
        {
            invoiceType,
            cron,
            createDate,
            paymentDate,
            price,
            content,
        },
        { loading: { show: true }, success: { show: true } }
    )
}

export const deleteInvoiceSchedule = async (id: string) => {
    await RestCaller.delete(`InvoiceSchedules/${id}`, {
        loading: { show: true },
        success: { show: true },
    })
}
