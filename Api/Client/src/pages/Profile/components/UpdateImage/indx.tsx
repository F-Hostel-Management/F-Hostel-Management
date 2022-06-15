import {
    Box,
    Button,
    CardActionArea,
    CardMedia,
    MobileStepper,
    Paper,
    Typography,
} from '@mui/material'
import React, { Dispatch, FC, SetStateAction } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { IUser } from '../../../../interface/IUser'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

interface IUpdateImage {
    values: IUser
    setValues: Dispatch<SetStateAction<any>>
}

const UpdateImage: FC<IUpdateImage> = ({ values, setValues }) => {
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0)
    const preview = [values.frontIdentification, values.backIdentification]
    const maxSteps = 2
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleChooseImageFront = (e: any) => {
        setValues({
            ...values,
            frontIdentification: URL.createObjectURL(e.target.files[0]),
        })
    }

    const handleChooseImageBack = (e: any) => {
        setValues({
            ...values,
            backIdentification: URL.createObjectURL(e.target.files[0]),
        })
    }

    const handleChooseImage = [handleChooseImageFront, handleChooseImageBack]

    return (
        <div>
            <Box
                sx={{
                    maxWidth: 300,
                    flexGrow: 1,
                    border: '1px solid #dadada',
                    mt: 2,
                    ml: 2,
                    textAlign: 'center',
                }}
            >
                <Paper
                    square
                    elevation={0}
                    sx={{
                        textAlign: 'left',
                        height: 'auto',
                        ml: 2,
                        my: 1,
                        bgcolor: 'background.default',
                    }}
                >
                    <Typography>Citizen ID photo</Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '15px',
                            color: 'grey.600',
                        }}
                    >
                        Please upload 2 sides of identity card
                    </Typography>
                </Paper>

                {!preview[activeStep] ? (
                    <CardActionArea
                        sx={{
                            height: 255,
                            maxWidth: 400,
                            width: '100%',
                            p: 2,
                            borderTop: '1px solid #dadada',
                        }}
                    >
                        <label>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }}
                                onChange={handleChooseImage[activeStep]}
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
                            Upload image
                        </Typography>
                    </CardActionArea>
                ) : (
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="194"
                            image={preview[activeStep]}
                            alt="Paella dish"
                        />
                        <label>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }}
                                onChange={handleChooseImage[activeStep]}
                            ></input>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'grey.600',
                                    p: 1,
                                    cursor: 'pointer',
                                }}
                            >
                                Change image
                            </Typography>
                        </label>
                    </CardActionArea>
                )}

                <MobileStepper
                    variant="text"
                    steps={2}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </div>
    )
}
export default UpdateImage
