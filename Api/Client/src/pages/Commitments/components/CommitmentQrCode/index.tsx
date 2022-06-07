import { Button, InputAdornment } from '@mui/material'
import React, { ChangeEvent, FC, Fragment, useState } from 'react'
import InputField from '../../../../components/Input/InputField'
import QrCode from '../../../../components/QrCode'
import { getJoiningCode } from '../../../../services/commitments'
import * as Styled from './styles'

interface ICommitmentQrCodeProps {}

const CommitmentQrCode: FC<ICommitmentQrCodeProps> = (props) => {
    const commitmentId = '28fdadc5-0a4f-4057-a9c4-08da487f8276'
    const [timeSpan, setTimeSpan] = useState<number>(0)
    const [qrLink, setQrLink] = useState<any>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeSpan(Number(e.target.value))
    }

    const handleClickCreateQr = async () => {
        const link = await getJoiningCode({
            commitementId: commitmentId,
            timeSpan: timeSpan,
        })
        setQrLink(link)
    }
    return (
        <Fragment>
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
                        <InputAdornment position="end">minutes</InputAdornment>
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
            {qrLink && (
                <Styled.ContainerStep>
                    <QrCode link={qrLink} size={200} />
                </Styled.ContainerStep>
            )}
        </Fragment>
    )
}

export default CommitmentQrCode
