import React, { Dispatch, FC, SetStateAction } from 'react'
import InputField from '../../../../components/Input/InputField'
import { IField } from '../../../../interface/IField'
import * as Styled from './styles'

interface IHostelFormProps {
    values: Record<string, any>
    handleInputChange: Dispatch<SetStateAction<any>>
}

const HostelForm: FC<IHostelFormProps> = ({ values, handleInputChange }) => {
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
        {
            label: 'Hostel Category Id',
            name: 'hostelCategoryId',
            type: 'string',
            required: true,
        },
    ]

    return (
        <Styled.Wrapper>
            <Styled.Side>
                {fields.slice(0, 2).map((field) => (
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
            </Styled.Side>
            <Styled.Side>
                {fields.slice(2, 4).map((field) => (
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
            </Styled.Side>
        </Styled.Wrapper>
    )
}

export default HostelForm
