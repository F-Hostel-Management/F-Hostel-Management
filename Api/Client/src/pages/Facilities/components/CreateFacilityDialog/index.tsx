import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { IFacilityValues } from '../../../../interface/IFacility'
import FacilityForm from '../FacilityForm'
interface ICreateFacilityDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
    handleSubmit: () => void
}

const CreateFacilityDialog: FC<ICreateFacilityDialogProps> = ({
    openDialog,
    handleCloseDialog,
    handleSubmit,
}) => {
    const initialValues: IFacilityValues = {
        facilityName: '',
        category: '',
        price: 0,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IFacilityValues>(initialValues)

    return (
        <FormDialog
            title="Create Facility"
            action="Create"
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

export default CreateFacilityDialog
