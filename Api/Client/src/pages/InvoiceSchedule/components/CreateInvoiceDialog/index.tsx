import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
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
    const initialValues: IInvoiceProps = {
        roomId: '',
        paymentDate: 1,
        invoiceType: 'House',
        price: 0,
        content: '',
        cron: 'Month',
        quantity: 1,
        unitPrice: 0,
        createDate: 'Monday',
        overdueDays: 0,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IInvoiceProps>(initialValues)
    const handleCreateSubmit = async () => {
        //....api
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
