import { Button, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IManager } from '../../../../interface/IManager'
import { IUser } from '../../../../interface/IUser'
import { getImageUrl } from '../../../../utils/ImageUtils'
import FormInfo from '../../../../components/ProfileInfo'
import * as Styled from './style'
import { ERole } from '../../../../utils/enums'
import { getUserById } from '../../../../services/UserService'
import { showError, showSuccess } from '../../../../utils/Toast'
import { RestCaller } from '../../../../utils/RestCaller'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { fetchHostelAssignmentList } from '../../../../slices/managerSlice'
type Props = {
    manager: IManager
    handleCloseDialog: () => void
}

export const ManagerProfile = ({ manager, handleCloseDialog }: Props) => {
    const currentUser = manager
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    const initialValues: IUser = {
        name: currentUser?.name,
        role: ERole.MANAGER_ROLE,
        email: '',
        dateOfBirth: '',
        gender: '',
        phone: '',
        avatar: '',
        address: '',
        citizenIdentity: 0,
        frontIdentification: '',
        backIdentification: '',
    }
    const [profile, setProfile] = useState(initialValues)
    const dispatch = useAppDispatch()
    const hostelId = getItem('currentHostelId')
    useEffect(() => {
        getUserById(manager.id).then((element) => {
            if (element) {
                setProfile(element)
            } else {
                showError('Cannot get user info')
            }
        })
    }, [manager])
    const handleRemoveManager = async () => {
        const response = await RestCaller.post('HostelManagements/remove', {
            hostelId: hostelId,
            managerId: profile.id,
        })
        if (!response || response.isError) return showError(response.result)
        showSuccess(response.result)
        dispatch(fetchHostelAssignmentList({ currentPage, currentPageSize }))
        handleCloseDialog()
    }
    return (
        <Styled.Container>
            <Styled.Avatar>
                <img
                    src={getImageUrl(profile.avatar)}
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
            <FormInfo values={profile} readonly={true} />
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
