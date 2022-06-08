import { Button, InputAdornment, Typography } from '@mui/material'
import React, { ChangeEvent, FC, Fragment, useState } from 'react'
import InputField from '../../../../components/Input/InputField'
import QrCode from '../../../../components/QrCode'
import { getJoiningCode } from '../../../../services/CommitmentService'
import * as Styled from './styles'
const baseUrl = import.meta.env.PUBLIC_FRONTEND
interface ICommitmentQrCodeProps {
    commitmentId: string
}

const CommitmentQrCode: FC<ICommitmentQrCodeProps> = ({ commitmentId }) => {
    const [timeSpan, setTimeSpan] = useState<number>(0)
    const [qrLink, setQrLink] = useState<any>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeSpan(Number(e.target.value))
    }

    const handleClickCreateQr = async () => {
        const response = await getJoiningCode({
            commitmentId: commitmentId,
            timeSpan: timeSpan,
        })
        setQrLink(response.result.sixDigitsCode)
    }
    return (
        <Fragment>
            {!qrLink ? (
                <div
                    style={{
                        width: '80%',
                        margin: '16px auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        minHeight: '300px',
                    }}
                >
                    <InputField
                        label="Time Span"
                        name="timeSpan"
                        value={timeSpan || ''}
                        onChange={handleChange}
                        type="number"
                        required={true}
                        endAdornment={
                            <InputAdornment position="end">
                                minutes
                            </InputAdornment>
                        }
                    />
                    <Button
                        variant="contained"
                        color="orange"
                        onClick={handleClickCreateQr}
                    >
                        Create QR Code
                    </Button>
                </div>
            ) : (
                <Styled.ContainerStep>
                    <QrCode
                        link={`${baseUrl}/home/joinRoom/${qrLink}`}
                        size={200}
                    />
                    <Typography variant="body2">Scan me</Typography>
                </Styled.ContainerStep>
            )}
        </Fragment>
    )
}

export default CommitmentQrCode
