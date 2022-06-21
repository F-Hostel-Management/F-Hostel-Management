import {
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material'
import React, { FC, useRef, useState } from 'react'
import QrCode from '../../../../components/QrCode'
import * as Styled from './styles'
import { ContentCopy, Done } from '@mui/icons-material'
import BootstrapTooltip from '../../../../components/BootstrapTooltip'
interface IQrCodeGenerateProps {
    code: string | number
}

const QrCodeGenerate: FC<IQrCodeGenerateProps> = ({ code }) => {
    console.log(window.location.origin)
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const textAreaRef = useRef(null)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code.toString())
        setIsCopied(true)
    }
    return (
        <Styled.Container>
            <div style={{ textAlign: 'center' }}>
                <QrCode
                    link={`${window.location.origin}/home/joinRoom/${code}`}
                    size={200}
                />
                <Typography variant="body2">
                    Scan me or click to download
                </Typography>
            </div>

            <Divider orientation="vertical" flexItem>
                or
            </Divider>

            <TextField
                ref={textAreaRef}
                label="Room Code"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '30ch' }}
                size="small"
                value={code}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={copyToClipboard}
                            >
                                {isCopied ? (
                                    <BootstrapTooltip title="Copied!">
                                        <Done color="success" />
                                    </BootstrapTooltip>
                                ) : (
                                    <ContentCopy />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Styled.Container>
    )
}

export default QrCodeGenerate
