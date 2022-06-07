import { Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import { ROLES } from '../../../FillInformation/constants'
import * as Styled from './styles'
interface IAvatarProps {
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
}

const Avatar: React.FC<IAvatarProps> = ({ values, setValues }) => {
    const handleChooseImage = (e: any) => {
        setValues({
            ...values,
            avatarUrl: URL.createObjectURL(e.target.files[0]),
        })
    }

    const { name, role, avatarUrl } = values

    return (
        <div>
            <label>
                <input
                    type="file"
                    id="avatar"
                    accept="image/png, image/jpeg"
                    style={{ display: 'none' }}
                    onChange={handleChooseImage}
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
                {name}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'grey.600',
                    textAlign: 'center',
                }}
            >
                {ROLES[role ?? 0].name}
            </Typography>
        </div>
    )
}

export default Avatar
