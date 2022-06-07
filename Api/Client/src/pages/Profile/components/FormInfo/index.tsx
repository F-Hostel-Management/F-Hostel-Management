import { Button, MenuItem, Grid } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import InputField from '../../../../components/Input/InputField'
import { IUser } from '../../../../interface/IUser'
import { RestCaller } from '../../../../utils/RestCaller'
import { showSuccess } from '../../../../utils/Toast'
import { IProfileFormInfo } from '../../interface'
import UpdateImage from '../UpdateImage/indx'
import * as Styled from './styles'

interface IFormInfoProps {
    values: IUser
    setValues: Dispatch<SetStateAction<any>>
    handleInputChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        isForce?: boolean
    ) => void
}
const GENDERS = ['Male', 'Female', 'Other']
const FormInfo: React.FC<IFormInfoProps> = ({
    values,
    handleInputChange,
    setValues,
}) => {
    const onSaveProfile = async () => {
        const body: IProfileFormInfo = {
            citizenIdentity: values.citizenIdentity,
            dateOfBirth: values.dateOfBirth,
            name: values.name,
            phone: values.phone,
            gender: values.gender,
            organization: values.organization,
            taxCode: values.taxCode,
            address: values.address,
        }
        const profileResult = await RestCaller.patch('Users/update-user', body)
        showSuccess('ok')
    }
    return (
        <Styled.FormContainer>
            <div>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div style={{ maxWidth: '350px' }}>
                            <InputField
                                label="Full name"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                autoFocus
                            />

                            <InputField
                                label="Email"
                                name="email"
                                value={values.email}
                                InputProps={{
                                    readOnly: true,
                                }}
                                disabled
                            />
                            <InputField
                                label="Birthday"
                                name="dateOfBirth"
                                value={values.dateOfBirth}
                                onChange={handleInputChange}
                                type="date"
                            />
                            <InputField
                                label="Gender"
                                value={values.gender}
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
                                value={values.phone}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => handleInputChange(event, true)}
                                type="number"
                                name="phone"
                            />
                            <InputField
                                label="Address"
                                value={values.address}
                                name="address"
                                onChange={handleInputChange}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div style={{ maxWidth: '350px' }}>
                            <InputField
                                label="Citizen ID number"
                                value={values.citizenIdentity}
                                onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => handleInputChange(event, true)}
                                type="number"
                                name="cardNumber"
                            />
                            <UpdateImage
                                values={values}
                                setValues={setValues}
                            />
                        </div>
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSaveProfile}
                    fullWidth
                    sx={{ mt: 4 }}
                >
                    SAVE
                </Button>
            </div>
        </Styled.FormContainer>
    )
}

export default FormInfo
