import React, { FC, useState } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CommitmentStepper from '../CommitmentStepper'
import { useForm } from '../../../../hooks/useForm'
import { rooms } from '../../../../utils/MockData'
import { ICommitmentValues } from '../../../../interface/commitment'
interface IUpdateCommitmentDialogProps {
    openDialog: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
}

const UpdateCommitmentDialog: FC<IUpdateCommitmentDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: ICommitmentValues = {
        createDate: new Date().toJSON(),
        startDate: '23/07/2001',
        endDate: '23/07/2006',
        roomId: '1',
        overdueDays: 3,
        compensation: 3000000,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)
    const [roomInfo, setRoomInfo] = useState<any | null>(rooms[0])

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
            />
        </DialogCustom>
    )
}

export default UpdateCommitmentDialog
