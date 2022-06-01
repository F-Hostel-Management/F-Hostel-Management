import { TextField } from '@mui/material'
import * as React from 'react'

interface IInputFieldProps {
    name?: string
    label?: string
    value?: string | number | null
    onChange?: any
    type?: string

    [x: string | number | symbol]: unknown
}

const InputField: React.FunctionComponent<IInputFieldProps> = ({
    name,
    label,
    value,
    onChange,
    type,
    ...others
}) => {
    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            size="small"
            sx={{
                width: 300,
                '& .MuiInputLabel-root': {
                    fontSize: '1.6rem',
                },
                '& .MuiInputBase-input': {
                    fontSize: '1.6rem',
                    height: '3rem',
                },
                margin: '16px',
            }}
            {...others}
        />
    )
}

export default InputField
