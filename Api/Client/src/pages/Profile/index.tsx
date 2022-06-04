import React, { useEffect, useState } from 'react'
import * as Styled from './styles'

import avatarDefault from '../../assets/images/Avatar.png'
import { Grid, Typography } from '@mui/material'
import FormInfo from './components/FormInfo'
import { IInformation } from './interface'

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = () => {
    const [information, setInformation] = useState<IInformation>({
        fullName: 'Dang Phuong Anh',
        role: 'Tenant',
        address: 'Ho Chi Minh City',
        birthDate: '18/8/2001',
        cardNumber: '012301000012',
        gender: 'Female',
        phoneNo: '0973997617',
        avatar: null,
    })
    const [preview, setPreview] = React.useState<string>()
    useEffect(() => {
        if (information.avatar) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(information.avatar)
        } else {
            setPreview(undefined)
        }
    }, [information.avatar])

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
                                ></input>
                                <Styled.Avatar elevation={0} square>
                                    <img
                                        src={
                                            information.avatar === null
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
                                {information.fullName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'grey.600',
                                    textAlign: 'center',
                                }}
                            >
                                {information.role}
                            </Typography>
                        </div>
                    </Styled.ProfileHeader>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item xs={12} md={9}>
                    <FormInfo info={information} />
                </Grid>
            </Styled.GridPaper>
        </Styled.ProfilePaper>
    )
}

export default Profile
