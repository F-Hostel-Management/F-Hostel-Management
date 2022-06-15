import { Button, InputAdornment } from '@mui/material'
import React, { ChangeEvent, FC, Fragment, useState } from 'react'
import InputField from '../../../../components/Input/InputField'
import { getJoiningCode } from '../../../../services/CommitmentService'
import QrCodeGenerate from '../QrCodeGenerate'
const baseUrl = import.meta.env.PUBLIC_FRONTEND
interface ICommitmentQrCodeProps {
    commitmentId: string
}

const CommitmentQrCode: FC<ICommitmentQrCodeProps> = ({ commitmentId }) => {
    const [timeSpan, setTimeSpan] = useState<number>(0)
    const [code, setCode] = useState<any>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeSpan(Number(e.target.value))
    }

    const handleClickCreateQr = async () => {
        const response = await getJoiningCode({
            commitmentId: commitmentId,
            timeSpan: timeSpan,
        })
        setCode(response.result.sixDigitsCode)
    }
    return (
        <Fragment>
            {!code ? (
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
                <QrCodeGenerate code={code} />
            )}
        </Fragment>
    )
}

export default CommitmentQrCode
