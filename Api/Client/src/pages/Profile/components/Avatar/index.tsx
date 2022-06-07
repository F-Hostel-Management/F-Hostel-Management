import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { IUser } from '../../../../interface/IUser'
import { ROLES } from '../../../FillInformation/constants'
import * as Styled from './styles'
interface IAvatarProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    values: IUser
}

const Avatar = (props: IAvatarProps) => {
    const [preview, setPreview] = React.useState<string>()
    const { avatarUrl, role, name } = props.values
    useEffect(() => {
        if (avatarUrl) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result as string)
            }
            // reader.readAsDataURL(avatarUrl)
        } else {
            setPreview(undefined)
        }
    }, [avatarUrl])
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
