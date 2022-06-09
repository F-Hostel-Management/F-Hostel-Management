import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { IFacility } from '../../../../interface/IFacility'
import { RestCaller } from '../../../../utils/RestCaller'
import FacilityForm from '../FacilityForm'

interface IUpdateFacilityDialogProps {
    openDialog: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    rowData: any
}

const UpdateFacilityDialog: FC<IUpdateFacilityDialogProps> = ({
    openDialog,
    handleCloseDialog,
    rowData,
}) => {
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IFacility>(rowData)
    const handleSubmit = async () => {
        await RestCaller.patch('/Facility', values)
        handleCloseDialog()
    }
    return (
        <FormDialog
            title="Update Facility"
            action="Update"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleSubmit}
            maxWidth="sm"
        >
            <FacilityForm
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
            />
        </FormDialog>
    )
}
export default UpdateFacilityDialog
