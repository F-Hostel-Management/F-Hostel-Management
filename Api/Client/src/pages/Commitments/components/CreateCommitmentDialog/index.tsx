import React, { FC, useState } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CommitmentStepper from '../CommitmentStepper'
import { useForm } from '../../../../hooks/useForm'
import { rooms, hostels } from '../../../../utils/MockData'
import { ICommitmentValues } from '../../../../interface/ICommitment'
interface ICreateCommitmentDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const CreateCommitmentDialog: FC<ICreateCommitmentDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: ICommitmentValues = {
        createDate: new Date().toJSON(),
        startDate: '',
        endDate: '',
        roomId: '',
        overdueDays: 0,
        compensation: 0,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)
    const [roomInfo, setRoomInfo] = useState<any | null>(rooms[0])
    const [hostelInfo, setHostelInfo] = useState<any | null>(hostels[0])

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
                roomInfo={roomInfo}
                setRoomInfo={setRoomInfo}
                hostelInfo={hostelInfo}
                setHostelInfo={setHostelInfo}
            />
        </DialogCustom>
    )
}

export default CreateCommitmentDialog
