import * as React from 'react'
import { DatePicker as InputDate } from '@mui/x-date-pickers/DatePicker'
import { TextField } from '@mui/material'
interface IDatePickerProps {
    name?: string
    label?: string
    value?: string | number | null
    onChange?: any
}

const DatePicker: React.FunctionComponent<IDatePickerProps> = ({
    name,
    label,
    value,
    onChange,
}) => {
    return (
        <InputDate
            openTo="year"
            views={['year', 'month', 'day']}
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(params) => (
                <TextField {...params} helperText={null} />
            )}
        />
    )
}

export default DatePicker
