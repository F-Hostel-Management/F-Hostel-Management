import { Typography, MenuItem, Button } from '@mui/material'
import React from 'react'

import InputField from '../../../../components/Input/InputField'
import { IUser } from '../../../../interface/IUser'
import * as Styled from './styles'

interface IFormInfoProps {
    info: IUser
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const GENDERS = ['Male', 'Female', 'Other']

const FormInfo: React.FC<IFormInfoProps> = ({ info }) => {
    const handleChange = () => {}

    return (
        <Styled.FormContainer>
            <div>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        mt: 1,
                        fontWeight: 600,
                        color: 'grey.700',
                        textDecoration: 'none',
                    }}
                >
                    Personal Information
                </Typography>
                <InputField
                    label="Full name"
                    value={info.name}
                    onChange={handleChange}
                    autoFocus
                />

                <InputField
                    label="Address"
                    value={info.address}
                    onChange={handleChange}
                />
                <InputField
                    label="Email"
                    value={info.email}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <InputField
                    label="Birthday"
                    value={info.dateOfBirth}
                    onChange={handleChange}
                    type="date"
                />

                <InputField
                    label="Gender"
                    value={info.gender}
                    onChange={handleChange}
                    select
                >
                    {GENDERS.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </InputField>

                <InputField
                    label="Phone number"
                    value={info.phone}
                    onChange={handleChange}
                    type="number"
                />

                <InputField
                    label="Citizen ID number"
                    value={info.cardNumber}
                    onChange={handleChange}
                    type="number"
                />
                <Button variant="contained" color="primary">
                    SAVE
                </Button>
            </div>
        </Styled.FormContainer>
    )
}

export default FormInfo
