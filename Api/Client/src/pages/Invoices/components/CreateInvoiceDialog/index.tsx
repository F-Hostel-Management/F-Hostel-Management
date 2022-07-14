import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { createInvoice } from '../../../../services/InvoiceService'
import { showError } from '../../../../utils/Toast'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
import InvoiceForm from '../InvoiceForm'
interface ICreateInvoiceDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
    reloadData: () => Promise<void>
}

const CreateInvoiceDialog: FC<ICreateInvoiceDialogProps> = ({
    openDialog,
    handleCloseDialog,
    reloadData,
}) => {
    const initialValues: IInvoiceProps = {
        roomId: '',
        dueDate: '',
        invoiceType: 'House',
        price: 0,
        content: '',
        lastQuantity: 0,
        quantity: 1,
        unitPrice: 0,
    }

    const { values, setValues, handleInputChange } =
        useForm<IInvoiceProps>(initialValues)

    const handleCreateSubmit = async () => {
        if (
            (values.invoiceType === 'Water' ||
                values.invoiceType === 'Electric') &&
            values.quantity <= values.lastQuantity
        ) {
            showError('Quantity must be greater than Last Quantity')
            return
        }
        if (values.unitPrice <= 0) {
            showError('Unit Price must be greater than 0')
            return
        }
        await createInvoice({
            roomId: values.roomId,
            content: values.content,
            dueDate: new Date(values.dueDate ?? ''),
            invoiceType: values.invoiceType,
            quantity: values.quantity,
            unitPrice: values.unitPrice,
            price: values.price,
        })
        reloadData()
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
