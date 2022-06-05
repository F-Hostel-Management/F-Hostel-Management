import React, { FormEvent, FC } from 'react'
import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StepButton, Stepper } from '@mui/material'
import { IStepper } from '../../interface/IStepper'

interface IStepByStepProps {
    steps: IStepper[]
    handleCloseDialog: () => void
}

const StepByStep: FC<IStepByStepProps> = ({ steps, handleCloseDialog }) => {
    const [activeStep, setActiveStep] = React.useState(0)
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean
    }>({})

    const totalSteps = () => {
        return steps.length
    }

    const allStepsCompleted = () => {
        return activeStep === totalSteps()
    }

    const handleStep = (step: number) => () => {
        setActiveStep(step)
    }

    const handleReset = () => {
        setActiveStep(0)
        handleCloseDialog()
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // next step
        setActiveStep(activeStep + 1)
        const newCompleted = completed
        newCompleted[activeStep] = true
        setCompleted(newCompleted)
        // custom your handle step
        steps[activeStep].handleNext()
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
                                    type="submit"
                                >
                                    {steps[activeStep].action}
                                </Button>
                            )}
                        </Box>
                    </form>
                )}
            </div>
        </Box>
    )
}

export default StepByStep
