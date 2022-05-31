import {
    Box,
    Button,
    CardActionArea,
    CardContent,
    Grid,
    Step,
    StepLabel,
    Stepper,
    Typography,
    TextField,
    MenuItem,
} from '@mui/material'
import * as React from 'react'

import * as Styled from './styles'
import Owner from '../../assets/images/ownerIcon.svg'
import Manager from '../../assets/images/managerIcon.svg'
import Tenant from '../../assets/images/tenantIcon.svg'

interface IFillInformationProps {}

const steps = ['Select your role', 'Personal information', 'Confirm']
const role = [
    { icon: Owner, name: 'Owner' },
    { icon: Manager, name: 'Manager' },
    { icon: Tenant, name: 'Tenant' },
]
const gender = ['Male', 'Female', 'Other']

const SetRole = () => {
    return (
        <Styled.Step>
            <Grid container>
                {role.map((role, index) => (
                    <Grid item key={index} xs={12} md={4}>
                        <Styled.RoleCard elevation={0} variant="outlined">
                            <CardActionArea>
                                <CardContent>
                                    <Styled.ImgRole
                                        src={role.icon}
                                        width="100%"
                                    ></Styled.ImgRole>
                                </CardContent>
                            </CardActionArea>
                        </Styled.RoleCard>
                        <Styled.RoleName variant="body2">
                            {role.name}
                        </Styled.RoleName>
                    </Grid>
                ))}
            </Grid>
        </Styled.Step>
    )
}

const PersonalInfomation = () => {
    return (
        <Styled.Step>
            <Grid container>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Fullname"
                        autoFocus
                        size="small"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Birthday"
                        defaultValue={new Date()}
                        size="small"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="ID card number"
                        size="small"
                        type="number"
                    />
                </Grid>
            </Grid>
            <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Address"
                size="small"
            />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Gender"
                        select
                        size="small"
                    >
                        {gender.map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="ID card number"
                        size="small"
                        type="number"
                    />
                </Grid>
            </Grid>
        </Styled.Step>
    )
}

const FillInformation: React.FunctionComponent<IFillInformationProps> = () => {
    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set<number>())

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        let newSkipped = skipped
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(activeStep)
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setSkipped(newSkipped)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    return (
        <Styled.Container>
            <Styled.MyPaper>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                            const stepProps: { completed?: boolean } = {}
                            const labelProps: {
                                optional?: React.ReactNode
                            } = {}
                            if (isStepSkipped(index)) {
                                stepProps.completed = false
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            )
                        })}
                    </Stepper>
                    <Styled.MainStep>
                        {(() => {
                            switch (activeStep) {
                                case steps.length:
                                    return (
                                        <React.Fragment>
                                            <Typography sx={{ mt: 2, mb: 1 }}>
                                                All steps completed -
                                                you&apos;re finished
                                            </Typography>
                                        </React.Fragment>
                                    )

                                case 0:
                                    return <SetRole />

                                case 1:
                                    return <PersonalInfomation />
                                default:
                                    return <div>You are a User.</div>
                            }
                        })()}
                    </Styled.MainStep>

                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    pt: 2,
                                }}
                            >
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    pt: 2,
                                }}
                            >
                                <Button
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1
                                        ? 'Finish'
                                        : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Styled.MyPaper>
        </Styled.Container>
    )
}

export default FillInformation
