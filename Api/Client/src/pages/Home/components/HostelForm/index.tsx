import React, { Dispatch, FC, SetStateAction } from 'react'
import InputField from '../../../../components/Input/InputField'
import * as Styled from './styles'
import { fields } from './fields'
interface IHostelFormProps {
    values: Record<string, any>
    handleInputChange: Dispatch<SetStateAction<any>>
}

const HostelForm: FC<IHostelFormProps> = ({ values, handleInputChange }) => {
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
