import React, { useEffect } from 'react'
import * as Styled from './styles'

import avatarDefault from '../../assets/images/avatar.png'
import { Grid, Typography } from '@mui/material'
import FormInfo from './components/FormInfo'
import { IInformation } from './interface'
import { useForm } from '../../hooks/useForm'

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = ({}) => {
    const initialValues: IInformation = {
        fullName: 'Dang Phuong Anh',
        role: 'Tenant',
        address: 'Ho Chi Minh City',
        email: 'abc@gmail.com',
        birthDate: '18/8/2001',
        cardNumber: '012101060113',
        gender: 'Female',
        phoneNo: '0973997617',
        avatar: null,
    }
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IInformation>(initialValues)
    const [preview, setPreview] = React.useState<string>()
    useEffect(() => {
        if (initialValues.avatar) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(initialValues.avatar)
        } else {
            setPreview(undefined)
        }
    }, [initialValues.avatar])

    return (
        <Styled.ProfilePaper>
            <Styled.GridPaper container>
                <Grid item xs={12} md={3}>
                    <Styled.ProfileHeader>
                        <div>
                            <label>
                                <input
                                    type="file"
                                    id="avatar"
                                    accept="image/png, image/jpeg"
                                    style={{ display: 'none' }}
                                    onChange={handleInputChange}
                                ></input>
                                <Styled.Avatar elevation={0} square>
                                    <img
                                        src={
                                            initialValues.avatar === null
                                                ? avatarDefault
                                                : preview
                                        }
                                        height="auto"
                                        width="100%"
                                    ></img>
                                </Styled.Avatar>
                            </label>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'grey.700',
                                    textAlign: 'center',
                                    mt: 2,
                                    fontWeight: 600,
                                }}
                            >
                                {initialValues.fullName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'grey.600',
                                    textAlign: 'center',
                                }}
                            >
                                {initialValues.role}
                            </Typography>
                        </div>
                    </Styled.ProfileHeader>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item xs={12} md={9}>
                    <FormInfo info={initialValues} />
                </Grid>
            </Styled.GridPaper>
        </Styled.ProfilePaper>
    )
}

export default Profile
