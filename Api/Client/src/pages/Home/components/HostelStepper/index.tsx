import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import HostelForm from '../HostelForm'

interface IHostelStepperProps {
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const HostelStepper: FC<IHostelStepperProps> = ({
    values,
    setValues,
    handleInputChange,
}) => {
    return (
        <HostelForm
            values={values}
            handleInputChange={handleInputChange}
            setValues={setValues}
        />
    )
}

export default HostelStepper
