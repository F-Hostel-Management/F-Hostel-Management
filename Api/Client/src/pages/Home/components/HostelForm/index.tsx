import React, { FC } from 'react'
import InputField from '../../../../components/Input/InputField'
import { IField } from '../../../../interface/IField'
import * as Styled from './styles'
import { styled } from '@mui/material/styles'
const Input = styled('input')({
    display: 'none',
})

interface IHostelFormProps {
    values: any
    setValues: any
    handleInputChange: any
}

const HostelForm: FC<IHostelFormProps> = ({
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
        },
        {
            label: 'Address',
            name: 'address',
            type: 'text',
            required: true,
        },
        {
            label: 'Number of rooms',
            name: 'numOfRooms',
            type: 'number',
            required: true,
        },
    ]

    return (
        <Styled.Wrapper>
            {fields.slice(0, 3).map((field) => (
                <InputField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={values[field.name]}
                    type={field.type}
                    required={field.required}
                    disabled={field.disabled}
                    endAdornment={field.endAdornment}
                    onChange={handleInputChange}
                />
            ))}
        </Styled.Wrapper>
    )
}

export default HostelForm
