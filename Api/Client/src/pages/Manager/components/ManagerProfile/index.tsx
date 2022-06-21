import { Button, Divider, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../../hooks/reduxHook'
import { IManager } from '../../../../interface/IManager'
import { IUser } from '../../../../interface/IUser'
import { getImageUrl } from '../../../../utils/ImageUtils'
import FormInfo from '../../../../components/ProfileInfo'
import * as Styled from './style'
type Props = {
    manager: IManager
}

export const ManagerProfile = ({ manager }: Props) => {
    const currentUser = useAppSelector((state) => state.auth.currentUser)

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
    const handleRemoveManager = () => {}
    return (
        <Styled.Container>
            <Styled.Avatar>
                <img
                    src={getImageUrl(initialValues.avatar)}
                    height="auto"
                    width="100%"
                    alt="avatar"
                ></img>
            </Styled.Avatar>
            <Typography
                variant="body2"
                sx={{
                    color: 'grey.700',
                    textAlign: 'center',
                    mt: 2,
                    fontWeight: 600,
                }}
            >
                {manager.name}
            </Typography>
            <Divider sx={{ mb: 4 }}>
                <Typography color="text.secondary" variant="caption">
                    Manager Information
                </Typography>
            </Divider>
            <FormInfo values={initialValues} readonly={true} />
            <Styled.ActionContainer>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleRemoveManager}
                >
                    Remove
                </Button>
            </Styled.ActionContainer>
        </Styled.Container>
    )
}
