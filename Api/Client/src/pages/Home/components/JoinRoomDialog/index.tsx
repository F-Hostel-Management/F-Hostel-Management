import React, { FC, useState } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import StepByStep from '../../../../components/StepByStep'
import { IStepper } from '../../../../interface/IStepper'
import Step1 from './Step1'
import Step2 from './Step2'
import { useNavigate, useParams } from 'react-router-dom'
import {
    activateCommitment,
    getCommitmentFromCode,
} from '../../../../services/CommitmentService'
interface IJoinRoomDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const JoinRoomDialog: FC<IJoinRoomDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    let { sixDigitsCode } = useParams()
    const navigate = useNavigate()
    const [scanResult, setScanResult] = useState(sixDigitsCode || '')
    const [isOpen, setIsOpen] = useState(true)
    const [commitment, setCommitment] = useState<any>(null)

    const handleStep1 = async () => {
        const response = await getCommitmentFromCode(scanResult)
        setCommitment(response.result)
    }

    const handleStep2 = async () => {
        const response = await activateCommitment({
            sixDigitsJoiningCode: scanResult,
        })
    }

    const steps: IStepper[] = [
        {
            name: 'Scan QR Code',
            component: (
                <Step1 scanResult={scanResult} setScanResult={setScanResult} />
            ),
            handleNext: handleStep1,
            action: 'Next',
        },
        {
            name: 'Commitment',
            component: <Step2 commitment={commitment} />,
            handleNext: handleStep2,
            action: 'Next',
        },
    ]
    return (
        <DialogCustom
            title="Join Room"
            openDialog={sixDigitsCode ? isOpen : openDialog}
            handleCloseDialog={
                sixDigitsCode ? () => setIsOpen(false) : handleCloseDialog
            }
        >
            <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
        </DialogCustom>
    )
}

export default JoinRoomDialog
