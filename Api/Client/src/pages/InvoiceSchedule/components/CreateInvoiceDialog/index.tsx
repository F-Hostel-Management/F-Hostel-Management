import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { IInvoice } from '../../../../interface/IInvoice'
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
    const initialValues: IInvoice = {
        roomName: '',
        paymentDate: 1,
        type: 'House',
        price: 0,
        content: '',
        cron: 'None',
        quantity: 1,
        unitPrice: 0,
        createDate: '',
        overdueDays: 0,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IInvoice>(initialValues)
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
