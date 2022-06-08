import React, { FC } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CommitmentStepper from '../CommitmentStepper'
import { useForm } from '../../../../hooks/useForm'
import { ICommitmentValues } from '../../../../interface/ICommitment'
import moment from 'moment'
interface ICreateCommitmentDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const CreateCommitmentDialog: FC<ICreateCommitmentDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: ICommitmentValues = {
        createdDate: moment(new Date()).format('YYYY-MM-DD'),
        startDate: '',
        endDate: '',
        roomId: '',
        overdueDays: 0,
        compensation: 0,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)

    return (
        <DialogCustom
            title="Create Commitment"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
        >
            <CommitmentStepper
                handleCloseDialog={handleCloseDialog}
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
                resetForm={resetForm}
            />
        </DialogCustom>
    )
}

export default CreateCommitmentDialog
