import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useAppDispatch } from '../../../../hooks/reduxHook'
import { useForm } from '../../../../hooks/useForm'
import { IInvoiceSchedule } from '../../../../interface/IInvoice'
import { updateInvoiceSchedule } from '../../../../services/InvoiceScheduleService'
import { IInvoiceScheduleProps } from '../../interfaces/IInvoiceScheduleProps'
import InvoiceForm from '../InvoiceForm'

interface IUpdateInvoiceDialogProps {
    openDialog: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    rowData: IInvoiceSchedule
}

const UpdateInvoiceDialog: FC<IUpdateInvoiceDialogProps> = ({
    openDialog,
    handleCloseDialog,
    rowData,
}) => {
    const dispatch = useAppDispatch()
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IInvoiceScheduleProps>({
            roomId: rowData?.room?.id ?? '',
            cron: rowData?.cron ?? '',
            createDate: rowData?.createDate ?? 1,
            paymentDate: rowData?.paymentDate ?? 1,
            content: rowData?.content ?? '',
            invoiceType: rowData?.invoiceType ?? '',
            price: rowData?.price ?? 0,
        })
    const handleSubmit = async () => {
        await updateInvoiceSchedule({
            id: rowData?.id ?? '',
            content: values.content,
            cron: values.cron,
            createDate: values.createDate,
            paymentDate: values.paymentDate,
            invoiceType: values.invoiceType,
            price: values.price,
        })
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
