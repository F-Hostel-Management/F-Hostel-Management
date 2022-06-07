import { Typography, Button, MenuItem } from '@mui/material'
import React from 'react'

import InputField from '../../../../components/Input/InputField'
import { IUser } from '../../../../interface/IUser'
import { RestCaller } from '../../../../utils/RestCaller'
import { showSuccess } from '../../../../utils/Toast'
import { IProfileFormInfo } from '../../interface'
import * as Styled from './styles'

interface IFormInfoProps {
    info: IUser
    handleInputChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        isForce?: boolean
    ) => void
}
const GENDERS = ['Male', 'Female', 'Other']
const FormInfo: React.FC<IFormInfoProps> = ({ info, handleInputChange }) => {
    const onSaveProfile = async () => {
        const body: IProfileFormInfo = {
            cardNumber: info.cardNumber,
            dateOfBirth: info.dateOfBirth,
            name: info.name,
            phone: info.phone,
            gender: info.gender,
            organization: info.organization,
            taxCode: info.taxCode,
        }
        const profileResult = await RestCaller.patch('Users/update-user', body)
        showSuccess('ok')
    }
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
                    name="name"
                    value={info.name}
                    onChange={handleInputChange}
                    autoFocus
                />

                <InputField
                    label="Address"
                    value={info.address}
                    name="address"
                    onChange={handleInputChange}
                />
                <InputField
                    label="Email"
                    name="email"
                    value={info.email}
                    InputProps={{
                        readOnly: true,
                    }}
                    disabled
                />
                <InputField
                    label="Birthday"
                    name="dateOfBirth"
                    value={info.dateOfBirth}
                    onChange={handleInputChange}
                    type="date"
                />
                <InputField
                    label="Gender"
                    value={info.gender}
                    name="gender"
                    onChange={handleInputChange}
                    select
                >
                    {GENDERS.map((option, index) => (
                        <MenuItem key={index} value={index}>
                            {option}
                        </MenuItem>
                    ))}
                </InputField>

                <InputField
                    label="Phone number"
                    value={info.phone}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(event, true)
                    }
                    type="number"
                    name="phone"
                />

                <InputField
                    label="Citizen ID number"
                    value={info.cardNumber}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(event, true)
                    }
                    type="number"
                    name="cardNumber"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSaveProfile}
                >
                    SAVE
                </Button>
            </div>
        </Styled.FormContainer>
    )
}

export default FormInfo
