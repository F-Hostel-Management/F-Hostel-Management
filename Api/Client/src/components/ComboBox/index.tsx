import { Autocomplete, Paper } from '@mui/material'
import React, { FC } from 'react'
import InputField from '../Input/InputField'

interface IComboBoxProps {
    label: string
    options: Record<string, any>[]
    optionLabel: string
    valueAutocomplete: any
    setValueAutocomplete: any
    [x: string | number | symbol]: unknown
}

const ComboBox: FC<IComboBoxProps> = ({
    label,
    optionLabel,
    options,
    valueAutocomplete,
    setValueAutocomplete,
    ...others
}) => {
    const [inputValue, setInputValue] = React.useState('')
    const CustomPaper: FC<{}> = (props) => {
        return <Paper elevation={8} style={{ fontSize: '1.6rem' }} {...props} />
    }
    return (
        <Autocomplete
            disablePortal
            id="combo-box"
            value={valueAutocomplete}
            onChange={(event: any, newValue: string | null) => {
                setValueAutocomplete(newValue)
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            options={options}
            sx={{
                width: 300,
                '& .MuiAutocomplete-input ': {
                    fontSize: '1.6rem',
                    height: '3rem',
                },
            }}
            getOptionLabel={(option) => option[optionLabel]?.toString()}
            PaperComponent={CustomPaper}
            renderInput={(params) => (
                <InputField
                    {...params}
                    label={label}
                    variant="outlined"
                    sx={{ margin: '16px 0' }}
                />
            )}
            size="small"
            {...others}
        />
    )
}

export default ComboBox
