import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import StepByStep from '../../../../components/StepByStep'
import { IStepper } from '../../../../interface/IStepper'
import RoomFacilities from '../RoomFacilities'
import RoomForm from '../RoomForm'

interface IRoomStepperProps {
    handleCloseDialog: () => void
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    resetForm: () => void
}

const RoomStepper: FC<IRoomStepperProps> = ({
    handleCloseDialog,
    values,
    setValues,
    handleInputChange,
    resetForm,
}) => {
    const steps: IStepper[] = [
        {
            name: 'Create Room',
            component: (
                <RoomForm
                    values={values}
                    handleInputChange={handleInputChange}
                />
            ),
            handleNext: () => console.log('Values commit: ', values),
            action: 'Next',
        },
        {
            name: 'Add Facilities',
            component: <RoomFacilities />,
            handleNext: () => console.log('Submit'),
            action: 'Next',
        },
    ]
    return <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
}

export default RoomStepper
