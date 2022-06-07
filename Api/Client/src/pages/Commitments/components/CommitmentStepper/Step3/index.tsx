import { InputAdornment } from '@mui/material'
import React, { ChangeEvent, FC, Fragment } from 'react'
import InputField from '../../../../../components/Input/InputField'
interface IStep3Props {
    timeSpan: number
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Step3: FC<IStep3Props> = ({ timeSpan, handleChange }) => {
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
                    value={timeSpan}
                    onChange={handleChange}
                    type="number"
                    required={true}
                    endAdornment={
                        <InputAdornment position="end">minutes</InputAdornment>
                    }
                />
            </div>
        </Fragment>
    )
}

export default Step3
