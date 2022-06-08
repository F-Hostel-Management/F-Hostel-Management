import React from 'react'
import * as Styled from './styles'

import Avatar from './components/Avatar'
import { useForm } from '../../hooks/useForm'
import { IUser } from '../../interface/IUser'
import { AppState } from '../../stores/reduxStore'
import { useSelector } from 'react-redux'
import FormInfo from './components/FormInfo'
import { Navigate } from 'react-router-dom'
import { Divider, Typography } from '@mui/material'
import { RestCaller } from '../../utils/RestCaller'

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = ({}) => {
    const currentUser = useSelector((state: AppState) => state.auth.currentUser)

    const initialValues: IUser = {
        name: currentUser?.name,
        role: currentUser?.role,
        email: currentUser?.email,
        dateOfBirth: currentUser?.dateOfBirth,
        gender: currentUser?.gender,
        phone: currentUser?.phone,
        avatarUrl: currentUser?.avatarUrl,
        citizenIdentity: currentUser?.citizenIdentity,
        frontIdentification: currentUser?.frontIdentification,
        backIdentification: currentUser?.backIdentification,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IUser>(initialValues)

    console.log('gender ' + initialValues.gender)

    const callApi = async () => {
        const { avatarUrl } = values
        console.log('avt: ' + avatarUrl)
        const uploadAvatar = await RestCaller.upload(
            'Users/upload-avatar',
            (() => {
                const formData = new FormData()
                formData.append('Avatar', avatarUrl as string)
                return formData
            })()
        )

        if (uploadAvatar.isError) return
    }

    React.useEffect(() => {
        ;(async () => {
            await callApi()
        })()
        return
    })

    return currentUser == null ? (
        <Navigate to="/login" replace={true} />
    ) : (
        <Styled.ProfilePaper>
            <Styled.ProfileHeader>
                <Avatar setValues={setValues} values={values}></Avatar>
            </Styled.ProfileHeader>

            {/* <Divider orientation="vertical" flexItem /> */}

            <Divider sx={{ mb: 4 }}>
                <Typography color="text.secondary" variant="caption">
                    Personal Information
                </Typography>
            </Divider>

            <FormInfo
                values={values}
                handleInputChange={handleInputChange}
                setValues={setValues}
            />
        </Styled.ProfilePaper>
    )
}

export default Profile
