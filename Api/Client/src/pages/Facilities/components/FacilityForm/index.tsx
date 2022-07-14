import { InputAdornment, MenuItem } from '@mui/material'
import * as React from 'react'
import InputField from '../../../../components/Input/InputField'
import { FacilityCategory } from '../../../../constants/FacilityCategory'
import { IField } from '../../../../interface/IField'
import { formatPrice } from '../../../../utils/FormatPrice'
import * as Styled from './styles'

interface IFacilityFormProps {
    values: any
    setValues: any
    handleInputChange: any
}

const FacilityForm: React.FC<IFacilityFormProps> = ({
    values,
    setValues,
    handleInputChange,
}) => {
    const fields: IField[] = [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            required: true,
            inputProps: { maxlength: 25 },
        },
        {
            label: 'Quantity',
            name: 'quantity',
            type: 'number',
            required: true,
            inputProps: { min: 0, max: 100 },
        },
        {
            label: 'Price',
            name: 'price',
            type: 'string',
            required: true,
            endAdornment: <InputAdornment position="end">($)</InputAdornment>,
            inputProps: { maxlength: 10 },
        },
    ]
    const { type } = values
    React.useEffect(() => {
        setValues({ ...values, type: type })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])
    return (
        <Styled.FormContainer>
            <div style={{ width: '350px' }}>
                <InputField
                    label="Facility category"
                    name="type"
                    value={type}
                    required={true}
                    select
                    onChange={handleInputChange}
                >
                    {FacilityCategory.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </InputField>
                {fields.map((field, index) => (
                    <InputField
                        key={index}
                        label={field.label}
                        name={field.name}
                        value={
                            field.name === 'unitPrice' || field.name === 'price'
                                ? formatPrice(values[field.name]) //string
                                : (values[field.name] as any)
                        }
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                        onChange={handleInputChange}
                        endAdornment={field.endAdornment}
                        inputProps={field.inputProps}
                    />
                ))}
            </div>
        </Styled.FormContainer>
    )
}
export default FacilityForm
