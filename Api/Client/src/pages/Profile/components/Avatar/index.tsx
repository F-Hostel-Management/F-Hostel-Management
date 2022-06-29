import { Typography } from '@mui/material'
import React, { Dispatch, SetStateAction, useState } from 'react'

import { ROLES } from '../../../FillInformation/constants'
import * as Styled from './styles'
import { CameraAlt, PersonOutlineOutlined } from '@mui/icons-material'
import { RestCaller } from '../../../../utils/RestCaller'
interface IAvatarProps {
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
}

const Avatar: React.FC<IAvatarProps> = ({ values, setValues }) => {
    const [avt, setAvt] = useState<File>()

    const { name, role, avatar } = values

    const callApi = async () => {
        if (!avt) return
        const uploadAvatar = await RestCaller.upload(
            'Users/upload-avatar',
            (() => {
                const formData = new FormData()
                formData.append('Avatar', avt)
                return formData
            })()
        )

        if (uploadAvatar.isError) return
    }
    const handleChooseImage = (e: any) => {
        setAvt(e.target.files[0])

        setValues({
            ...values,
            avatar: URL.createObjectURL(e.target.files[0]),
        })
    }

    React.useEffect(() => {
        ;(async () => {
            await callApi()
        })()
        return
    })

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
                            {avatar === null ? (
                                <Styled.IconAvatar>
                                    <PersonOutlineOutlined
                                        htmlColor="#a7a7a7"
                                        sx={{ width: '100%', height: '100%' }}
                                    />
                                </Styled.IconAvatar>
                            ) : (
                                <img
                                    src={avatar}
                                    height="auto"
                                    width="100%"
                                    alt="avatar"
                                ></img>
                            )}
                            <Styled.Text>
                                <div>
                                    <CameraAlt htmlColor="#ffffff" />
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
