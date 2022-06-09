import * as React from 'react'
import { IHostelValues } from '../../../../interface/IHostel'
import { useForm } from '../../../../hooks/useForm'
import DialogCustom from '../../../../components/DialogCustom'
import HostelStepper from '../HostelStepper'

interface IUpdateHostelDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const UpdateHostelDialog: React.FunctionComponent<IUpdateHostelDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: IHostelValues = {
        address: '',
        name: '',
        numOfRooms: 0,
        hostelCategoryId: '',
        ownerId: '',
        imgPath: '',
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IHostelValues>(initialValues)

    const handleSubmit = () => {}
    return (
        <DialogCustom
            title="Update Hostel"
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

export default UpdateHostelDialog
