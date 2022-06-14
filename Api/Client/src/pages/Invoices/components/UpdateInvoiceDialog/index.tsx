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
import { formatContent, parseContent } from '../../../../utils/InvoiceUtils'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
import InvoiceForm from '../InvoiceForm'

interface IUpdateInvoiceDialogProps {
    openDialog: boolean
    handleOpenDialog: () => void
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

    const initial = parseContent(rowData.content ?? '')
    const { values, setValues, handleInputChange } = useForm<IInvoiceProps>({
        content: initial.content,
        dueDate: moment(new Date(rowData.dueDate ?? '')).format('YYYY-MM-DD'),
        invoiceType: rowData.invoiceType ?? '',
        roomId: rowData?.room?.id ?? '',
        price: rowData?.price ?? 0,
        quantity: initial.quantity,
        unitPrice: initial.unitPrice,
    })
    const handleSubmit = async () => {
        await updateInvoice({
            id: rowData.id ?? '',
            content: formatContent({
                content: values.content,
                quantity: values.quantity,
                unitPrice: values.unitPrice,
            }),
            dueDate: new Date(values.dueDate),
            invoiceType: values.invoiceType,
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
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
            />
        </FormDialog>
    )
}
export default UpdateInvoiceDialog
