import { Typography } from '@mui/material'
import React from 'react'
import { IUser } from '../../../../interface/IUser'
import * as Styled from './styles'
interface IAvatarProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    values: IUser
}

const Avatar = (props: IAvatarProps) => {
    const { avatarUrl, role } = props.values
    return (
        <div>
            <label>
                <input
                    type="file"
                    id="avatar"
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                    onChange={props.handleInputChange}
                ></input>
                <Styled.Avatar elevation={0} square>
                    <img src={avatarUrl} height="auto" width="100%"></img>
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
    )
}

export default Avatar
