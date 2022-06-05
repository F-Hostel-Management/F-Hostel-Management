import React, { FC, ChangeEvent, Dispatch, SetStateAction } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { rooms } from '../../../../utils/MockData'
import StepByStep from '../../../../components/StepByStep'
import { IStepper } from '../../../../interface/IStepper'

interface ICommitmentStepperProps {
    handleCloseDialog: () => void
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    resetForm: () => void
    roomInfo: Record<string, any>[]
    setRoomInfo: any
    hostelInfo: Record<string, any>
    setHostelInfo: any
}

const CommitmentStepper: FC<ICommitmentStepperProps> = ({
    handleCloseDialog,
    values,
    setValues,
    handleInputChange,
    resetForm,
    roomInfo,
    setRoomInfo,
    hostelInfo,
    setHostelInfo,
}) => {
    const steps: IStepper[] = [
        {
            name: 'Terms',
            component: (
                <Step1
                    values={values}
                    setValues={setValues}
                    handleInputChange={handleInputChange}
                    roomInfo={roomInfo}
                    setRoomInfo={setRoomInfo}
                    roomOptions={rooms}
                    hostelInfo={hostelInfo}
                    setHostelInfo={setHostelInfo}
                />
            ),
            handleNext: () => alert('Step 1'),
            action: 'Next',
        },
        {
            name: 'Commitment',
            component: (
                <Step2
                    roomInfo={roomInfo}
                    createDate={values?.createDate}
                    startDate={values?.startDate}
                    endDate={values?.endDate}
                    overdueDays={values?.overdueDays}
                    compensation={values?.compensation}
                />
            ),
            handleNext: () => alert('Step 2'),
            action: 'Create',
        },
        {
            name: 'QR code',
            component: <Step3 />,
            handleNext: () => alert('Step 3'),
            action: 'Confirm',
        },
    ]

    return <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
}

export default CommitmentStepper
