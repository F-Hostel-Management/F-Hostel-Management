import React from 'react'
import * as Styled from './styles'

import Avatar from './components/Avatar'
import { useForm } from '../../hooks/useForm'
import { IUser } from '../../interface/IUser'
import { AppState } from '../../stores/reduxStore'
import { useSelector } from 'react-redux'
import FormInfo from '../../components/ProfileInfo'
import { Navigate } from 'react-router-dom'
import { Divider, Typography } from '@mui/material'

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = () => {
    const currentUser = useSelector((state: AppState) => state.auth.currentUser)

    const initialValues: IUser = {
        name: currentUser?.name,
        role: currentUser?.role,
        email: currentUser?.email,
        dateOfBirth: currentUser?.dateOfBirth,
        gender: currentUser?.gender,
        phone: currentUser?.phone,
        avatar: currentUser?.avatar,
        address: currentUser?.address,
        citizenIdentity: currentUser?.citizenIdentity,
        frontIdentification: currentUser?.frontIdentification,
        backIdentification: currentUser?.backIdentification,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IUser>(initialValues)

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
