import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useAppDispatch } from '../../../../hooks/reduxHook'
import { useForm } from '../../../../hooks/useForm'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
import InvoiceForm from '../InvoiceForm'

interface IUpdateInvoiceDialogProps {
    openDialog: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    rowData: IInvoiceProps
}

const UpdateInvoiceDialog: FC<IUpdateInvoiceDialogProps> = ({
    openDialog,
    handleCloseDialog,
    rowData,
}) => {
    const dispatch = useAppDispatch()
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IInvoiceProps>(rowData)
    const handleSubmit = async () => {
        //api
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
