import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { IFacilityValues } from '../../../../interface/IFacility'
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
        useForm<IFacilityValues>(rowData)
    const handleSubmit = () => {}
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
