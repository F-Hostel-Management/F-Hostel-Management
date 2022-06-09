import { Button, Divider, InputAdornment, Typography } from '@mui/material'
import React, { FC, useRef, useState } from 'react'
import QrReader from 'react-qr-reader'
import InputField from '../../../../../components/Input/InputField'
interface IStep1Props {}
import * as Styled from './styles'
import CheckIcon from '@mui/icons-material/Check'

const Step1: FC<IStep1Props> = () => {
    const [scanResultFile, setScanResultFile] = useState('')
    const [scanResultWebCam, setScanResultWebCam] = useState('')

    const qrRef = useRef<any>(null)

    const onScanFile = () => {
        qrRef?.current?.openImageDialog()
    }

    const handleErrorFile = (error: any) => {
        console.log(error)
    }

    const handleScanFile = (result: any) => {
        if (result) {
            setScanResultFile(result)
        }
    }

    const handleErrorWebCam = (error: any) => {
        console.log(error)
    }

    const handleScanWebCam = (result: any) => {
        if (result) {
            setScanResultWebCam(result)
        }
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
                </Typography>
                <InputField
                    name="roomCode"
                    label="Room Code"
                    value={scanResultWebCam || scanResultFile}
                    endAdornment={
                        <InputAdornment position="end">
                            <CheckIcon color="success" />
                        </InputAdornment>
                    }
                />
            </Styled.WrapperRight>
        </Styled.QrContainer>
    )
}

export default Step1
