import React, { Dispatch, FC, SetStateAction } from 'react'
import * as Styled from './styles'
import InputField from '../../../../components/Input/InputField'
import { fields } from './fields'

interface IRoomFormProps {
    action: 'Create' | 'Update'
    values: Record<string, any>
    handleInputChange: Dispatch<SetStateAction<any>>
}

const RoomForm: FC<IRoomFormProps> = ({
    action,
    values,
    handleInputChange,
}) => {
    // if action = update, system will hide "quantity" field
    const indexStart = action === 'Create' ? 0 : 1

    return (
        <Styled.Wrapper>
            <Styled.Side>
                {fields.slice(indexStart, 5).map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={values[field.name]}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                        endAdornment={field.endAdornment}
                        inputProps={field.inputProps}
                        onChange={handleInputChange}
                    />
                ))}
            </Styled.Side>
            <Styled.Side>
                {fields.slice(5, 10).map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={values[field.name]}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                        endAdornment={field.endAdornment}
                        inputProps={field.inputProps}
                        onChange={handleInputChange}
                    />
                ))}
            </Styled.Side>
        </Styled.Wrapper>
    )
}

export default RoomForm
