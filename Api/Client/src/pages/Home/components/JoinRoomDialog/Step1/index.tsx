import { Button, Divider, InputAdornment, Typography } from '@mui/material'
import React, { ChangeEvent, FC, useRef } from 'react'
import QrReader from 'react-qr-reader'
import InputField from '../../../../../components/Input/InputField'
import * as Styled from './styles'
import CheckIcon from '@mui/icons-material/Check'
import { useNavigate } from 'react-router-dom'

interface IStep1Props {
    scanResult: string
    setScanResult: any
    handleCloseDialog: any
}

const Step1: FC<IStep1Props> = ({
    scanResult,
    setScanResult,
    handleCloseDialog,
}) => {
    const navigate = useNavigate()
    const qrRef = useRef<any>(null)

    const onScanFile = () => {
        qrRef?.current?.openImageDialog()
    }

    const handleErrorFile = (error: any) => {
        console.log(error)
    }

    const handleScanFile = (result: any) => {
        if (result) {
            setScanResult(result.slice(-6))
            navigate(`joinRoom/${result.slice(-6)}`)
            handleCloseDialog()
        }
    }

    const handleErrorWebCam = (error: any) => {
        console.log(error)
    }

    const handleScanWebCam = (result: any) => {
        if (result) {
            setScanResult(result.slice(-6))
            navigate(`joinRoom/${result.slice(-6)}`)
            handleCloseDialog()
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setScanResult(event.target.value)
    }
    return (
        <Styled.QrContainer>
            <Styled.WrapperLeft>
                <QrReader
                    delay={300}
                    style={{
                        width: '300px',
                        height: '300px',
                        borderColor: 'transparent',
                    }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                />
                <Styled.QrFile>
                    <Button
                        variant="contained"
                        color="orange"
                        onClick={onScanFile}
                        size="small"
                        sx={{ width: 'max-content' }}
                    >
                        Select on device
                    </Button>
                    <QrReader
                        ref={qrRef}
                        delay={300}
                        style={{ display: 'none' }}
                        onError={handleErrorFile}
                        onScan={handleScanFile}
                        legacyMode
                    />
                </Styled.QrFile>
            </Styled.WrapperLeft>
            <Divider orientation="vertical" flexItem>
                or
            </Divider>
            <Styled.WrapperRight>
                <Typography variant="body2">
                    <strong>Enter your code:</strong>
                    {scanResult}
                </Typography>
                <InputField
                    name="roomCode"
                    label="Room Code"
                    value={scanResult}
                    endAdornment={
                        <InputAdornment position="end">
                            <CheckIcon color="success" />
                        </InputAdornment>
                    }
                    type="number"
                    inputProps={{ minLength: 6, maxLength: 6 }}
                    onChange={handleChange}
                    required={true}
                />
            </Styled.WrapperRight>
        </Styled.QrContainer>
    )
}

export default Step1
