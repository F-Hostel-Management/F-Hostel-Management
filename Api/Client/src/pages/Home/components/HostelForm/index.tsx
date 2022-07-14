import React, { Dispatch, FC, SetStateAction } from 'react'
import InputField from '../../../../components/Input/InputField'
import * as Styled from './styles'
import { fields } from './fields'
import UploadHostelImage from '../UploadHostelImage'
interface IHostelFormProps {
    values: Record<string, any>
    handleInputChange: Dispatch<SetStateAction<any>>
    setValues: Dispatch<SetStateAction<any>>
}

const HostelForm: FC<IHostelFormProps> = ({
    values,
    handleInputChange,
    setValues,
}) => {
    return (
        <Styled.Wrapper>
            <Styled.Side>
                {fields.map((field) => (
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
                        inputProps={field.inputProps}
                    />
                ))}
            </Styled.Side>
            <Styled.Side>
                <UploadHostelImage values={values} setValues={setValues} />
            </Styled.Side>
        </Styled.Wrapper>
    )
}

export default HostelForm
