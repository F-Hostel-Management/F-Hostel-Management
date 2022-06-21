import moment from 'moment'
import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { useForm } from '../../../../hooks/useForm'
import { IInvoice } from '../../../../interface/IInvoice'
import { updateInvoice } from '../../../../services/InvoiceService'
import {
    fetchInvoices,
    fetchNumberOfInvoice,
} from '../../../../slices/invoiceSlice'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
import InvoiceForm from '../InvoiceForm'

interface IUpdateInvoiceDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
    rowData: IInvoice
}

const UpdateInvoiceDialog: FC<IUpdateInvoiceDialogProps> = ({
    openDialog,
    handleCloseDialog,
    rowData,
}) => {
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)

    const { values, setValues, handleInputChange } = useForm<IInvoiceProps>({
        content: rowData?.content ?? '',
        dueDate: moment(new Date(rowData.dueDate ?? '')).format('YYYY-MM-DD'),
        invoiceType: rowData.invoiceType ?? '',
        roomId: rowData?.room?.id ?? '',
        price: rowData?.price ?? 0,
        quantity: rowData?.quantity ?? 0,
        lastQuantity: 0,
        unitPrice: rowData?.unitPrice ?? 0,
    })
    const handleSubmit = async () => {
        await updateInvoice({
            id: rowData.id ?? '',
            content: values.content,
            dueDate: new Date(values.dueDate),
            invoiceType: values.invoiceType,
            quantity: values.quantity,
            unitPrice: values.unitPrice,
            price: values.price,
        })
        dispatch(fetchInvoices({ currentPageSize, currentPage }))
        dispatch(fetchNumberOfInvoice())
        handleCloseDialog()
    }
    return (
        <FormDialog
            title="Update Invoice"
            action="Update"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleSubmit}
            maxWidth="md"
        >
            <InvoiceForm
                id={rowData?.id ?? ''}
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
            />
        </FormDialog>
    )
}
export default UpdateInvoiceDialog
