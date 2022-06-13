import { EInvoiceStatus } from './enums'
import { IInvoice } from '../interface/IInvoice'

export const invoices: IInvoice[] = [
    {
        id: '1',
        invoiceCode: '1',
        roomName: '701',
        createDate: '',
        dueDate: '',
        type: 'Service',
        price: 0,
        content: '',
        isDeleted: false,
        status: EInvoiceStatus.Unpaid,
        creator: '',
        cron: 'Week',
    },
    {
        id: '2',
        invoiceCode: '2',
        roomName: '701',
        createDate: '',
        dueDate: '',
        type: 'Electric',
        price: 0,
        content: '',
        isDeleted: false,
        status: EInvoiceStatus.Paid,
        creator: '',
        cron: 'Month',
    },
    {
        id: '3',
        invoiceCode: '3',
        roomName: '701',
        createDate: '',
        dueDate: '',
        type: 'House',
        price: 0,
        content: '',
        isDeleted: false,
        status: EInvoiceStatus.Overdue,
        creator: '',
        cron: 'Year',
    },
    {
        id: '4',
        invoiceCode: '4',
        roomName: '701',
        createDate: '',
        dueDate: '',
        type: 'Water',
        price: 0,
        content: '',
        isDeleted: false,
        status: EInvoiceStatus.Pending,
        creator: '',
        cron: 'Month',
    },
]

export const getData = (page: number, pageSize: number, agr: any[]): any[] => {
    const start = (page - 1) * pageSize
    const end = page * pageSize < agr.length ? page * pageSize : agr.length
    const result: any[] = agr.slice(start, end)
    return result
}
