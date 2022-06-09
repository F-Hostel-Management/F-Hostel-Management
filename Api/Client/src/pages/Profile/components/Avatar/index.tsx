import { Typography } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import { ROLES } from '../../../FillInformation/constants'
import * as Styled from './styles'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
interface IAvatarProps {
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
}

const Avatar: React.FC<IAvatarProps> = ({ values, setValues }) => {
    const handleChooseImage = (e: any) => {
        setValues({
            ...values,
            avatar: URL.createObjectURL(e.target.files[0]),
        })
    }

    const { name, role, avatar } = values

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
                <div>
                    <Styled.Avatar elevation={0} square>
                        <div>
                            {avatar === undefined ? (
                                <Styled.IconAvatar>
                                    <PersonOutlineOutlinedIcon
                                        htmlColor="#a7a7a7"
                                        sx={{ width: '100%', height: '100%' }}
                                    />
                                </Styled.IconAvatar>
                            ) : (
                                <img
                                    src={avatar}
                                    height="auto"
                                    width="100%"
                                ></img>
                            )}
                            <Styled.Text>
                                <div>
                                    <CameraAltIcon htmlColor="#ffffff" />
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: '#e2e2e2',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Change image
                                    </Typography>
                                </div>
                            </Styled.Text>
                        </div>
                    </Styled.Avatar>
                </div>
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
