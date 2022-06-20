import { Button, MenuItem, Grid } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'

import InputField from '../../../../components/Input/InputField'
import { IUser } from '../../../../interface/IUser'
import { RestCaller } from '../../../../utils/RestCaller'
import { showError, showSuccess } from '../../../../utils/Toast'
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
    const [frontImg, setFrontImg] = useState<File>()
    const [backImg, setBackImg] = useState<File>()

    const onSaveProfile = async () => {
        const body: IProfileFormInfo = {
            citizenIdentity: values.citizenIdentity,
            dateOfBirth: values.dateOfBirth,
            name: values.name,
            phone: values.phone,
            gender: values.gender,
            taxCode: values.taxCode,
            address: values.address,
        }
        const profileResult = await RestCaller.patch('Users/update-user', body)

        console.log('front: ' + frontImg)
        console.log('back: ' + backImg)
        if (frontImg && backImg) {
            const uploadIdentificationCard = await RestCaller.upload(
                'Users/upload-identification-card',
                (() => {
                    const formData = new FormData()
                    formData.append('FrontIdentification', frontImg)
                    formData.append('BackIdentification', backImg)
                    return formData
                })()
            )
            if (!profileResult.isError && !uploadIdentificationCard.isError) {
                showSuccess('Update successfully')
                return
            }
        } else if (!frontImg && backImg) {
            showError('Please upload 2 sides of identity card')
            return
        } else if (frontImg && !backImg) {
            showError('Please upload 2 sides of identity card')
            return
        }

        if (profileResult.isError) {
            showError('Update failed')
            return
        }
        showSuccess('Update successfully')
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
                                required
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
                                required
                            />
                            <InputField
                                label="Gender"
                                value={values.gender}
                                name="gender"
                                onChange={handleInputChange}
                                select
                                required
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
                                required
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
                                name="citizenIdentity"
                                required
                            />
                            <UpdateImage
                                values={values}
                                setValues={setValues}
                                setFrontImg={setFrontImg}
                                setBackImg={setBackImg}
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
