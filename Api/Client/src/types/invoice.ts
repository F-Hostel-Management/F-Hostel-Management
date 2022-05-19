export interface IInvoice {
    ID: string;
    invoiceCode: string;
    type: number;
    price: number;
    cron: number;
    content: string;
    isDeleted: boolean;
}