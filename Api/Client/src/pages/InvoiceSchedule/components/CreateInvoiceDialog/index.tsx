import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { createInvoiceSchedule } from '../../../../services/InvoiceScheduleService'
import { IInvoiceScheduleProps } from '../../interfaces/IInvoiceScheduleProps'
import InvoiceForm from '../InvoiceForm'
interface ICreateInvoiceDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
    reloadData?: () => Promise<void>
}

const CreateInvoiceDialog: FC<ICreateInvoiceDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: IInvoiceScheduleProps = {
        roomId: '',
        content: '',
        invoiceType: 'House',
        price: 0,
        cron: 'Month',
        createDate: 1,
        paymentDate: 1,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IInvoiceScheduleProps>(initialValues)
    const handleCreateSubmit = async () => {
        await createInvoiceSchedule({
            content: values.content,
            cron: values.cron,
            createDate: values.createDate,
            paymentDate: values.paymentDate,
            invoiceType: values.invoiceType,
            price: values.price,
            roomId: values.roomId,
        })
        handleCloseDialog()
    }

    return (
        <FormDialog
            title="Create Invoice"
            action="Create"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleCreateSubmit}
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

export default CreateInvoiceDialog
