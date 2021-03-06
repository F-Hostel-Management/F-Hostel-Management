import { TextField } from '@mui/material'
import * as React from 'react'

interface IInputFieldProps {
    name?: string
    label?: string
    value?: string | number | null | undefined | unknown
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    startAdornment?: any
    endAdornment?: any
    inputProps?: Record<string, any>
    width?: number
    [x: string | number | symbol]: unknown
}

const InputField: React.FunctionComponent<IInputFieldProps> = ({
    name,
    label,
    value,
    onChange,
    type,
    startAdornment,
    endAdornment,
    inputProps,
    width = 300,
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
                width: { width },
                '& .MuiInputLabel-root': {
                    fontSize: '1.6rem',
                },
                '& .MuiInputBase-input': {
                    fontSize: '1.6rem',
                    height: '3rem',
                },
                '& .MuiInputAdornment-root > .MuiTypography-root': {
                    fontSize: '1.3rem',
                },
                margin: '16px',
            }}
            InputProps={{
                startAdornment: startAdornment,
                endAdornment: endAdornment,
            }}
            inputProps={inputProps || { min: 0 }}
            {...others}
        />
    )
}

export default InputField
