import { IInvoiceSchedule } from '../interface/IInvoice'

export const invoices: IInvoiceSchedule[] = [
    {
        id: '1',
        invoiceCode: '1',
        room: '701',
        date: '',
        paymentDate: 2,
        invoiceType: 'Service',
        price: 0,
        content: '',
        isDeleted: false,
        cron: 'Week',
    },
    {
        id: '2',
        invoiceCode: '2',
        room: '701',
        date: '',
        paymentDate: 3,
        invoiceType: 'Electric',
        price: 0,
        content: '',
        isDeleted: false,
        cron: 'Month',
    },
]

export const getData = (page: number, pageSize: number, agr: any[]): any[] => {
    const start = (page - 1) * pageSize
    const end = page * pageSize < agr.length ? page * pageSize : agr.length
    const result: any[] = agr.slice(start, end)
    return result
}
