import * as React from 'react'
import { IHostelValues } from '../../../../interface/IHostel'
import { useForm } from '../../../../hooks/useForm'
import HostelStepper from '../HostelStepper'
import DialogCustom from '../../../../components/DialogCustom'
import { createHostel } from '../../../../services/hostels'

interface ICreateHostelDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const CreateHostelDialog: React.FunctionComponent<ICreateHostelDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: IHostelValues = {
        address: '',
        name: '',
        numOfRooms: 0,
        hostelCategoryId: '6c62f503-c093-4ef9-31e1-08da469bda62',
        image: null,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IHostelValues>(initialValues)

    const handleSubmit = () => {
        const { address, name, numOfRooms, hostelCategoryId, image } = values

        const createValues = { address, name, numOfRooms, hostelCategoryId }

        const uploadImageValues = { image }

        ;(async () => {
            await createHostel(createValues)
            // await uploadImage(uploadImageValues)
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
