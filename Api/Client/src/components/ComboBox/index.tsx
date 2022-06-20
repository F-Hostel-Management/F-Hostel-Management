import { Autocomplete, Paper } from '@mui/material'
import React, { FC } from 'react'
import InputField from '../Input/InputField'

interface IComboBoxProps<T> {
    label: string
    optionLabel: string
    options: T[]
    valueAutocomplete: T
    setValueAutocomplete: (valueAutocomplete: T) => void
    [x: string | number | symbol]: unknown
}

const ComboBox = <T extends Record<string, any>>({
    label,
    optionLabel,
    options,
    valueAutocomplete,
    setValueAutocomplete,
    ...others
}: IComboBoxProps<T>) => {
    const [inputValue, setInputValue] = React.useState('')

    const CustomPaper: FC<{}> = (props) => {
        return <Paper elevation={8} style={{ fontSize: '1.6rem' }} {...props} />
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box"
            value={valueAutocomplete}
            onChange={(
                event: React.SyntheticEvent<Element, Event>,
                newValue: T
            ) => {
                setValueAutocomplete(newValue || null)
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
