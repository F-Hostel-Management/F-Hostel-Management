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
    CardHeader,
    Card,
    CardMedia,
} from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import React, { useState } from 'react'

import * as Styled from './styles'
import Owner from '../../assets/images/ownerIcon.svg'
import Manager from '../../assets/images/managerIcon.svg'
import Tenant from '../../assets/images/tenantIcon.svg'

interface IInformation {
    fullName?: string
    birthDate?: string
    cardNumber?: string
    address?: string
    gender?: string
    phoneNo?: string
    imgCard?: string
}
interface IRole {
    icon: string
    name: string
}

interface IFillInformationProps {}
interface IPersonInformationProps {
    state: IInformation
    onChangeState: (state: IInformation) => void
}
interface ISetRoleProps {
    onChangeState: (state: string) => void
}

const steps = ['Select your role', 'Personal information', 'Confirm']
const roles: IRole[] = [
    { icon: Owner, name: 'Owner' },
    { icon: Manager, name: 'Manager' },
    { icon: Tenant, name: 'Tenant' },
]
const genders = ['Male', 'Female', 'Other']

const SetRole: React.FC<ISetRoleProps> = ({ onChangeState }) => {
    return (
        <Styled.Step>
            <Grid container>
                {roles.map((role, index) => (
                    <Grid item key={index} xs={12} md={4}>
                        <Styled.RoleCard elevation={0} variant="outlined">
                            <CardActionArea
                                onClick={() => onChangeState(role.name)}
                            >
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

const PersonalInformation: React.FC<IPersonInformationProps> = ({
    state,
    onChangeState,
}) => {
    const {
        fullName,
        birthDate,
        cardNumber,
        address,
        gender,
        phoneNo,
        imgCard,
    } = state

    const updateImage = (files: FileList | null) => {
        if (files != null) {
            console.log(files[0])
        }
    }

    return (
        <Styled.Step>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: '90%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Fullname"
                                autoFocus
                                size="small"
                                value={fullName ?? ''}
                                onChange={(e) =>
                                    onChangeState({
                                        ...state,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Birthday"
                                size="small"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={birthDate ?? ''}
                                onChange={(e) =>
                                    onChangeState({
                                        ...state,
                                        birthDate: e.target.value,
                                    })
                                }
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
                        value={address ?? ''}
                        onChange={(e) =>
                            onChangeState({ ...state, address: e.target.value })
                        }
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Gender"
                                select
                                size="small"
                                value={gender ?? ''}
                                onChange={(e) =>
                                    onChangeState({
                                        ...state,
                                        gender: e.target.value,
                                    })
                                }
                            >
                                {genders.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Phone number"
                                size="small"
                                value={phoneNo ?? ''}
                                onChange={(e) =>
                                    onChangeState({
                                        ...state,
                                        phoneNo: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="fullname"
                                label="Citizen ID number"
                                size="small"
                                type="number"
                                value={cardNumber ?? ''}
                                onChange={(e) =>
                                    onChangeState({
                                        ...state,
                                        cardNumber: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ m: 2, textAlign: 'center' }}>
                                <Card>
                                    <CardHeader
                                        title={
                                            <Typography variant="h6">
                                                Citizen ID photo
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'grey.600',
                                                }}
                                            >
                                                Please upload your Citizen ID
                                                photo
                                            </Typography>
                                        }
                                    />
                                    <input
                                        type="file"
                                        id="avatar"
                                        accept="image/png, image/jpeg"
                                        onChange={(event) => {
                                            updateImage(event.target.files)
                                        }}
                                    ></input>
                                    {!imgCard ? (
                                        <CardActionArea
                                            sx={{ height: '200px' }}
                                        >
                                            <label>
                                                <input
                                                    type="file"
                                                    id="avatar"
                                                    accept="image/png, image/jpeg"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) =>
                                                        onChangeState({
                                                            ...state,
                                                            imgCard:
                                                                e.target.value,
                                                        })
                                                    }
                                                ></input>

                                                <FileUploadIcon
                                                    htmlColor="#a7a7a7"
                                                    sx={{
                                                        width: '20%',
                                                        height: 'auto',
                                                    }}
                                                />
                                            </label>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'grey.600',
                                                }}
                                            >
                                                Upload file
                                            </Typography>
                                        </CardActionArea>
                                    ) : (
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={imgCard}
                                            alt="Paella dish"
                                        />
                                    )}
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Styled.Step>
    )
}

const FillInformation: React.FunctionComponent<IFillInformationProps> = () => {
    const [information, setInformation] = useState<IInformation>({})
    const [role, setRole] = useState<string>('Tenant')

    const [activeStep, setActiveStep] = React.useState(0)
    const [skipped, setSkipped] = React.useState(new Set<number>())

    const isStepSkipped = (step: number) => {
        return skipped.has(step)
    }

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            console.log(information)
            console.log(role)
            return
        }

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
                                    return <SetRole onChangeState={setRole} />

                                case 1:
                                    return (
                                        <PersonalInformation
                                            state={information}
                                            onChangeState={setInformation}
                                        />
                                    )
                                default:
                                    return <div>You are a User ({role}).</div>
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
                            <Styled.ButtonBox
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
                            </Styled.ButtonBox>
                        </React.Fragment>
                    )}
                </Box>
            </Styled.MyPaper>
        </Styled.Container>
    )
}

export default FillInformation