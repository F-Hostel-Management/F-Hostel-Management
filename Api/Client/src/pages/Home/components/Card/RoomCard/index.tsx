import React, { useState, FC, useEffect } from 'react'

import CardWithImage from '../../../../../components/Card/CardWithImage'
import { Typography, Button } from '@mui/material'
import { IRoom } from '../../../../../interface/IRoom'
import { getHostelOfRoom } from '../../../../../services/RoomService'
import { IHostel } from '../../../../../interface/IHostel'
import { setItem } from '../../../../../utils/LocalStorageUtils'
import { useNavigate } from 'react-router-dom'
const urlImage = import.meta.env.PUBLIC_FIREBASE_STORAGE_IMAGE

interface IRoomCardProps {
    room: IRoom
}

const RoomCard: FC<IRoomCardProps> = ({ room }) => {
    let navigate = useNavigate()

    const [hostel, setHostel] = useState<IHostel>()

    useEffect(() => {
        if (!('id' in room)) return
        ;(async () => {
            setHostel(await getHostelOfRoom(room?.id))
        })()
    }, [])

    const handleClickDetail = () => {
        setItem('currentRoomId', room?.id)
        navigate('dashboard')
    }

    return (
        <CardWithImage
            image={{
                src: hostel?.imgPath
                    ? urlImage + hostel?.imgPath + '?alt=media'
                    : '',
                alt: 'Room Image',
            }}
            content={
                <React.Fragment>
                    <Typography variant="h4" mb={1}>
                        <strong>{room?.roomName}</strong>
                    </Typography>
                    <Typography variant="subtitle1" mb={1}>
                        <span
                            style={{
                                width: '80px',
                                display: 'inline-block',
                            }}
                        >
                            Adress:{' '}
                        </span>
                        {hostel?.address}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                        <span
                            style={{
                                width: '80px',
                                display: 'inline-block',
                            }}
                        >
                            Hostel:{' '}
                        </span>
                        {hostel?.name}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                        <span
                            style={{
                                width: '80px',
                                display: 'inline-block',
                            }}
                        >
                            Area:
                        </span>
                        <span>
                            {room.area} m<sup>2</sup>
                        </span>
                    </Typography>
                    {/* <Typography
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <span
                            style={{
                                width: '80px',
                                display: 'inline-block',
                            }}
                        >
                            Status:{' '}
                        </span>
                        <Chip
                            label={room?.status}
                            color={
                                room.status === ERoomStatus.Available
                                    ? 'success'
                                    : 'gray'
                            }
                            sx={{ minWidth: '80px' }}
                        />
                    </Typography> */}
                </React.Fragment>
            }
            actions={
                <React.Fragment>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleClickDetail}
                    >
                        Details
                    </Button>
                </React.Fragment>
            }
        />
    )
}

export default RoomCard
