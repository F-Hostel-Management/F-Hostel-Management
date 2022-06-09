import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useForm } from '../../../../hooks/useForm'
import { IFacilityValues } from '../../../../interface/IFacility'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { RestCaller } from '../../../../utils/RestCaller'
import FacilityForm from '../FacilityForm'
interface ICreateFacilityDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
    reloadData: () => Promise<void>
}

const CreateFacilityDialog: FC<ICreateFacilityDialogProps> = ({
    openDialog,
    handleCloseDialog,
    reloadData,
}) => {
    const initialValues: IFacilityValues = {
        type: '',
        name: '',
        price: 0,
        quantity: 1,
        hostelId: getItem('currentHostelId'),
    }
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IFacilityValues>(initialValues)
    const handleCreateSubmit = async () => {
        const result = await RestCaller.put('Facility', values, true)
        if (result.isError) return
        await reloadData()
        handleCloseDialog()
    }

    return (
        <FormDialog
            title="Create Facility"
            action="Create"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleCreateSubmit}
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
