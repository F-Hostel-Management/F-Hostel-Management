import React, { FormEvent, FC } from 'react'
import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { StepLabel, Stepper } from '@mui/material'
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

    const handleReset = () => {
        setActiveStep(0)
        handleCloseDialog()
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // custom your handle step
        const resultStep = await steps[activeStep].handleNext()
        if (resultStep) {
            // next step
            setActiveStep(activeStep + 1)
            const newCompleted = completed
            newCompleted[activeStep] = true
            setCompleted(newCompleted)
        }
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                    <Step key={step?.name} completed={completed[index]}>
                        <StepLabel>{step?.name}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ width: '100%', m: 'auto' }}>
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
                            All steps completed - you are finished.
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
            </Box>
        </Box>
    )
}

export default StepByStep
