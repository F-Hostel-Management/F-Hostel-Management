import * as React from 'react'
import { IHostel, IHostelValues } from '../../../../../interface/IHostel'
import { useForm } from '../../../../../hooks/useForm'
import HostelStepper from '../../HostelStepper'
import FormDialog from '../../../../../components/DialogCustom/FormDialog'
import {
    updateHostel,
    uploadImage,
} from '../../../../../services/HostelService'
import { useAppDispatch } from '../../../../../hooks/reduxHook'
import { fetchHostelList } from '../../../../../slices/homeSlice'

interface IUpdateHostelDialogProps {
    hostelInfo: IHostel
    openDialog: boolean
    handleCloseDialog: () => void
}

const UpdateHostelDialog: React.FunctionComponent<IUpdateHostelDialogProps> = ({
    hostelInfo,
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: IHostelValues = {
        address: hostelInfo.address,
        name: hostelInfo.name,
    }
    const dispatch = useAppDispatch()
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IHostelValues>(initialValues)

    const handleSubmit = () => {
        const { address, name, image } = values

        const createValues = { address, name }

        ;(async () => {
            let response = await updateHostel(hostelInfo.id, createValues)
            if (!response.isError) {
                dispatch(fetchHostelList())
            }

            if (image) {
                const formData = new FormData()
                formData.append('HostelId', hostelInfo.id || '')
                formData.append('Image', image as File)
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
            title="Update Hostel"
            action="Update"
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

export default UpdateHostelDialog
