import React, { FC } from 'react'
import { IHostelValues } from '../../../../../interface/IHostel'
import { useForm } from '../../../../../hooks/useForm'
import {
    createHostel,
    uploadImage,
} from '../../../../../services/HostelService'
import HostelStepper from '../../HostelStepper'
import { useAppDispatch } from '../../../../../hooks/reduxHook'
import { fetchHostelList } from '../../../../../slices/homeSlice'
import FormDialog from '../../../../../components/DialogCustom/FormDialog'

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

    const handleSubmit = () => {
        const { address, name, image } = values

        const createValues = { address, name }
        const formData = new FormData()
        formData.append('Image', image as File)
        ;(async () => {
            let response = await createHostel(createValues)
            if (!response.isError) {
                formData.append('HostelId', response.result?.id)
                dispatch(fetchHostelList())
            }

            if (image) {
                response = await uploadImage(formData)
                if (!response.isError) {
                    dispatch(fetchHostelList())
                }
            }
            handleCloseDialog()
            resetForm()
        })()
    }
    return (
        <FormDialog
            title="Create New Hostel"
            action="Create"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            maxWidth="lg"
            handleSubmit={handleSubmit}
        >
            <HostelStepper
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
            />
        </FormDialog>
    )
}

export default CreateHostelDialog
