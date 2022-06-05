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
                    handleInputChange={handleInputChange}
                />
            ),
            handleNext: () => {},
            action: 'Next',
        },
        {
            name: 'Upload Hostel Image',
            component: (
                <UploadHostelImage values={values} setValues={setValues} />
            ),
            handleNext: handleSubmit,
            action: 'Create',
        },
    ]

    return <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
}

export default HostelStepper
