import React from 'react'
import * as Styled from './styles'

import { Grid } from '@mui/material'
import Avatar from './components/Avatar'
import { useForm } from '../../hooks/useForm'
import { IUser } from '../../interface/IUser'

interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = ({}) => {
    const initialValues: IUser = {
        name: 'Dang Phuong Anhs',
        role: 0,
        email: 'abc@gmail.com',
        dateOfBirth: '18/8/2001',
        cardNumber: '012101060113',
        gender: 0,
        phone: '0973997617',
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

    return (
        <Styled.ProfilePaper>
            <Styled.GridPaper container>
                <Grid item xs={12} md={3}>
                    <Styled.ProfileHeader>
                        <Avatar handleInputChange={handleInputChange}></Avatar>
                    </Styled.ProfileHeader>
                </Grid>
                {/* <Divider orientation="vertical" flexItem /> */}
                <Grid item xs={12} md={9}>
                    {/* <FormInfo info={initialValues} /> */}
                </Grid>
            </Styled.GridPaper>
        </Styled.ProfilePaper>
    )
}

export default Profile
