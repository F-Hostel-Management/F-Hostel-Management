import * as React from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import HostelForm from '../HostelForm'
import { IHostelValues } from '../../../../interface/IHostel'
import { useForm } from '../../../../hooks/useForm'

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
        imageSrc: '',
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IHostelValues>(initialValues)

    const handleSubmit = () => {}
    return (
        <FormDialog
            title="Update Hostel"
            action="Update"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleSubmit}
        >
            <HostelForm
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
            />
        </FormDialog>
    )
}

export default UpdateHostelDialog
