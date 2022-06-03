import React, {
    FormEvent,
    FC,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StepButton } from '@mui/material'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { rooms } from '../../../../utils/MockData'

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
    const [activeStep, setActiveStep] = React.useState(0)
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean
    }>({})

    const steps = [
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
        },
        {
            name: 'QR code',
            component: <Step3 />,
        },
    ]

    const totalSteps = () => {
        return steps.length
    }

    const allStepsCompleted = () => {
        return activeStep === totalSteps()
    }

    const handleStep = (step: number) => () => {
        setActiveStep(step)
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1)
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
    }

    const handleReset = () => {
        setActiveStep(0)
        handleCloseDialog()
        resetForm()
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('Submit Data: ', values)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper
                nonLinear
                activeStep={activeStep}
                sx={{ width: '80%', margin: 'auto' }}
            >
                {steps.map((step, index) => (
                    <Step key={step?.name} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {step?.name}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                {allStepsCompleted() ? (
                    <React.Fragment>
                        <Typography
                            sx={{
                                mt: 2,
                                mb: 1,
                                minHeight: '300px',
                                textAlign: 'center',
                            }}
                        >
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button variant="outlined" onClick={handleReset}>
                                Close
                            </Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <React.Fragment>
                            {steps[activeStep]?.component}
                        </React.Fragment>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            <Box sx={{ flex: '1 1 auto' }} />
                            {activeStep !== steps.length && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleNext}
                                    type="submit"
                                >
                                    {activeStep === totalSteps() - 1
                                        ? 'Confirm'
                                        : 'Next'}
                                </Button>
                            )}
                        </Box>
                    </form>
                )}
            </div>
        </Box>
    )
}

export default CommitmentStepper