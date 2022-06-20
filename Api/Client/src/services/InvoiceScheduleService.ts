import { RestCaller } from '../utils/RestCaller'

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
