import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useAppDispatch } from '../../../../hooks/reduxHook'
import { useForm } from '../../../../hooks/useForm'
import { IFacility } from '../../../../interface/IFacility'
import { fetchFacility } from '../../../../slices/facilitySlice'
import { getItem } from '../../../../utils/LocalStorageUtils'
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
    const dispatch = useAppDispatch()
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IFacility>(rowData)
    const handleSubmit = async () => {
        const hostelId = getItem('currentHostelId')
        const result = await RestCaller.patch('/Facility', values)
        if (result.isError) return
        dispatch(fetchFacility(hostelId))
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
