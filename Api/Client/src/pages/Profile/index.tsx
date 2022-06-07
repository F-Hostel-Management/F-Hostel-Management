import React from 'react'
import * as Styled from './styles'

import { Grid } from '@mui/material'
import Avatar from './components/Avatar'
import { useForm } from '../../hooks/useForm'
import { IUser } from '../../interface/IUser'
import { AppState } from '../../stores/reduxStore'
import { useSelector } from 'react-redux'
import FormInfo from './components/FormInfo'
import { Navigate } from 'react-router-dom'

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = ({}) => {
    const currentUser = useSelector((state: AppState) => state.auth.currentUser)

    const initialValues: IUser = {
        name: currentUser?.name,
        role: 0,
        email: currentUser?.email,
        dateOfBirth: currentUser?.dateOfBirth,
        gender: 0,
        phone: currentUser?.phone,
        avatarUrl: '',
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<IUser>(initialValues)
    // const [preview, setPreview] = React.useState<string>()
    // useEffect(() => {
    //     if (initialValues.avatar) {
    //         const reader = new FileReader()
    //         reader.onload = () => {
    //             setPreview(reader.result as string)
    //         }
    //         reader.readAsDataURL(initialValues.avatar)
    //     } else {
    //         setPreview(undefined)
    //     }
    // }, [initialValues.avatar])

    return currentUser == null ? (
        <Navigate to="/login" replace={true} />
    ) : (
        <Styled.ProfilePaper>
            <Styled.GridPaper container>
                <Grid item xs={12} md={3}>
                    <Styled.ProfileHeader>
                        <Avatar
                            handleInputChange={handleInputChange}
                            values={values}
                        ></Avatar>
                    </Styled.ProfileHeader>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item xs={12} md={9}>
                    <FormInfo
                        info={values}
                        handleInputChange={handleInputChange}
                    />
                </Grid>
            </Styled.GridPaper>
        </Styled.ProfilePaper>
    )
}

export default Profile
