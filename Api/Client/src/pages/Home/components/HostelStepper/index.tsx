import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import StepByStep from '../../../../components/StepByStep'
import { IStepper } from '../../../../interface/IStepper'
import HostelForm from '../HostelForm'
import UploadHostelImage from '../UploadHostelImage'

interface IHostelStepperProps {
    handleCloseDialog: () => void
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    resetForm: () => void
    handleSubmit: () => void
}

const HostelStepper: FC<IHostelStepperProps> = ({
    handleCloseDialog,
    values,
    setValues,
    handleInputChange,
    resetForm,
    handleSubmit,
}) => {
    const steps: IStepper[] = [
        {
            name: 'Information Of Hostel',
            component: (
                <HostelForm
                    values={values}
                    setValues={setValues}
                    handleInputChange={handleInputChange}
                />
            ),
            handleNext: () => alert('Step 1'),
            action: 'Next',
        },
        {
            name: 'Upload Hostel Image',
            component: <UploadHostelImage />,
            handleNext: () => alert('Step 2'),
            action: 'Create',
        },
    ]

    return <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
}

export default HostelStepper
