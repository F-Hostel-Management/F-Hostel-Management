import React, { FC, useState } from 'react'
import { IHostelValues } from '../../../../../interface/IHostel'
import { useForm } from '../../../../../hooks/useForm'
import DialogCustom from '../../../../../components/DialogCustom'
import {
    createHostel,
    uploadImage,
} from '../../../../../services/HostelService'
import HostelStepper from '../../HostelStepper'
import { useAppDispatch } from '../../../../../hooks/reduxHook'
import { fetchHostelList } from '../../../../../slices/homeSlice'

interface ICreateHostelDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const CreateHostelDialog: FC<ICreateHostelDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: IHostelValues = {
        address: '',
        name: '',
        image: undefined,
    }

    const dispatch = useAppDispatch()
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IHostelValues>(initialValues)
    const [hostelId, setHostelId] = useState<any>(null)

    const handleSubmit = () => {
        const { address, name, image } = values

        const createValues = { address, name }
        const formData = new FormData()
        formData.append('Image', image as File)
        ;(async () => {
            let response = await createHostel(createValues)
            if (!response.isError) {
                setHostelId(response.result?.id)
                formData.append('HostelId', response.result?.id)
                dispatch(fetchHostelList())
            }
            response = await uploadImage(formData)
            if (!response.isError) {
                dispatch(fetchHostelList())
                handleCloseDialog()
            }
        })()
    }
    return (
        <DialogCustom
            title="Create Hostel"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            maxWidth="lg"
        >
            <HostelStepper
                handleCloseDialog={handleCloseDialog}
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
                resetForm={resetForm}
                handleSubmit={handleSubmit}
            />
        </DialogCustom>
    )
}

export default CreateHostelDialog
