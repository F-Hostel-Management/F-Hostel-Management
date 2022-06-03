import React, { FC } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import StepByStep from '../../../../components/StepByStep'
import Step1 from './Step1'
import Step2 from './Step2'

interface IJoinRoomDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const JoinRoomDialog: FC<IJoinRoomDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const steps = [
        {
            name: 'Scan QR Code',
            component: <Step1 />,
        },
        {
            name: 'Commitment',
            component: <Step2 />,
        },
    ]
    return (
        <DialogCustom
            title="Join Room"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
        >
            <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
        </DialogCustom>
    )
}

export default JoinRoomDialog
