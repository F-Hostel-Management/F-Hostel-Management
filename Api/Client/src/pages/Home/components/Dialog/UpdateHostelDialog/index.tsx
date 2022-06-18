import * as React from 'react'
import { IHostel, IHostelValues } from '../../../../../interface/IHostel'
import { useForm } from '../../../../../hooks/useForm'
import HostelStepper from '../../HostelStepper'
import FormDialog from '../../../../../components/DialogCustom/FormDialog'

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

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IHostelValues>(initialValues)

    const handleSubmit = () => {}
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
