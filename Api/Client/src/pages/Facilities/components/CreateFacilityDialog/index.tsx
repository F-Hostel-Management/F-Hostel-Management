import React, { FC } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { useForm } from '../../../../hooks/useForm'
import { IFacilityValues } from '../../../../interface/IFacility'
import { fetchFacility, fetNumFacility } from '../../../../slices/facilitySlice'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { RestCaller } from '../../../../utils/RestCaller'
import FacilityForm from '../FacilityForm'
interface ICreateFacilityDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
    reloadData?: () => Promise<void>
}

const CreateFacilityDialog: FC<ICreateFacilityDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: IFacilityValues = {
        type: '',
        name: '',
        price: 0,
        quantity: 1,
        hostelId: getItem('currentHostelId'),
    }
    const hostelId = getItem('currentHostelId')
    const dispatch = useAppDispatch()
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IFacilityValues>(initialValues)
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    const handleCreateSubmit = async () => {
        const result = await RestCaller.put('Facility', values)
        if (result.isError) return
        dispatch(fetchFacility({ hostelId, currentPage, currentPageSize }))
        dispatch(fetNumFacility(hostelId))
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
