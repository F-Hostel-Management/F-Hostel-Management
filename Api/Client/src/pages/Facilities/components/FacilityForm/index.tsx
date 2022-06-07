import { InputAdornment, MenuItem } from '@mui/material'
import * as React from 'react'
import InputField from '../../../../components/Input/InputField'
import { FacilityCategory } from '../../../../constants/FacilityCategory'
import { IField } from '../../../../interface/IField'
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
            label: 'Facility Name',
            name: 'facilityName',
            type: 'text',
            required: true,
        },
        {
            label: 'Price',
            name: 'price',
            type: 'number',
            required: true,
            endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
        },
    ]
    const { category } = values
    React.useEffect(() => {
        setValues({ ...values, category: category })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category])
    return (
        <Styled.FormContainer>
            <div style={{ width: '350px' }}>
                <InputField
                    label="Facility Category"
                    name="category"
                    value={category}
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
                        value={values[field.name]}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                        onChange={handleInputChange}
                        endAdornment={field.endAdornment}
                    />
                ))}
            </div>
        </Styled.FormContainer>
    )
}
export default FacilityForm
