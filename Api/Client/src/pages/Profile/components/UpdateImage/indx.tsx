import { Box, Button, MobileStepper, Paper, Typography } from '@mui/material'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { IUser } from '../../../../interface/IUser'
import {
    FileUpload,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import * as Styled from './styles'
import { CameraAlt } from '@mui/icons-material'
import { getImageUrl } from '../../../../utils/ImageUtils'

interface IUpdateImage {
    values: IUser
    setValues: Dispatch<SetStateAction<IUser>>
    frontImg: File | undefined
    backImg: File | undefined
    setFrontImg: Dispatch<SetStateAction<File | undefined>>
    setBackImg: Dispatch<SetStateAction<File | undefined>>
    disabled: boolean
}

const UpdateImage: FC<IUpdateImage> = ({
    values,
    setValues,
    frontImg,
    backImg,
    setFrontImg,
    setBackImg,
    disabled,
}) => {
    const theme = useTheme()
    const [activeStep, setActiveStep] = React.useState(0)
    const preview = [values.frontIdentification, values.backIdentification]
    const imgID = [frontImg, backImg]
    const maxSteps = 2
    const { frontIdentification } = values
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleChooseImageFront = (e: any) => {
        setFrontImg(e.target.files[0])
        setValues({
            ...values,
            frontIdentification: URL.createObjectURL(e.target.files[0]),
        })
    }

    const handleChooseImageBack = (e: any) => {
        setBackImg(e.target.files[0])
        setValues({
            ...values,
            backIdentification: URL.createObjectURL(e.target.files[0]),
        })
    }

    const handleChooseImage = [handleChooseImageFront, handleChooseImageBack]

    console.log(frontIdentification)
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
                    <label>
                        {!disabled ? (
                            <input
                                type="file"
                                id="avatar"
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }}
                                onChange={handleChooseImage[activeStep]}
                            ></input>
                        ) : (
                            ''
                        )}
                        <div>
                            <Styled.Image elevation={0} square>
                                <div>
                                    <FileUpload
                                        htmlColor="#a7a7a7"
                                        sx={{
                                            width: '20%',
                                            height: 'auto',
                                        }}
                                    />

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'grey.600',
                                        }}
                                    >
                                        Upload image
                                    </Typography>
                                </div>
                            </Styled.Image>
                        </div>
                    </label>
                ) : (
                    <Styled.Image elevation={0} square>
                        <div>
                            <label>
                                {!disabled ? (
                                    <input
                                        type="file"
                                        id={
                                            activeStep == 0
                                                ? 'frontIdentification'
                                                : 'backIdentification'
                                        }
                                        accept="image/png, image/jpeg"
                                        style={{ display: 'none' }}
                                        onChange={handleChooseImage[activeStep]}
                                    ></input>
                                ) : (
                                    ''
                                )}
                                <div>
                                    <Styled.Img>
                                        <img
                                            src={
                                                imgID[activeStep] === undefined
                                                    ? getImageUrl(
                                                          preview[activeStep]
                                                      )
                                                    : preview[activeStep]
                                            }
                                            alt="Identity card"
                                            height="auto"
                                            width="100%"
                                        />
                                        <Styled.Text>
                                            {!disabled ? (
                                                <div>
                                                    <CameraAlt htmlColor="#ffffff" />
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: '#e2e2e2',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        Change image
                                                    </Typography>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </Styled.Text>
                                    </Styled.Img>
                                </div>
                            </label>
                        </div>
                    </Styled.Image>
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
