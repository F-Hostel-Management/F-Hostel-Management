import React, { FC } from 'react'

import Greeting from '../components/Greeting'
import RoomCard from '../components/RoomCard'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { Button } from '@mui/material'

import * as Styled from './styles'
import JoinRoomDialog from '../components/JoinRoomDialog'
import { useDialog } from '../../../hooks/useDialog'
import { IRoom } from '../../../interface/IRoom'
import { Route, Routes, useNavigate } from 'react-router-dom'

interface ITenantHomeProps {
    rooms: IRoom[]
}

const TenantHome: FC<ITenantHomeProps> = ({ rooms }) => {
    const navigate = useNavigate()
    const [openJoinRoom, handleOpenJoinRoom, handleCloseJoinRoom] = useDialog()

    const handleScanQrCoce = () => {
        handleOpenJoinRoom()
        navigate('joinRoom')
    }
    return (
        <Styled.HomeContainer>
            <Styled.ActionJoinWrapper>
                <Greeting />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QrCodeScannerIcon />}
                    className="hello"
                    onClick={handleScanQrCoce}
                >
                    Scan to join
                </Button>
            </Styled.ActionJoinWrapper>
            <React.Fragment>
                {rooms.map((room) => (
                    <RoomCard key={room?.id} room={room} />
                ))}
            </React.Fragment>
            <Routes>
                <Route
                    path="/joinRoom/:sixDigitsCode"
                    element={
                        <JoinRoomDialog
                            openDialog={openJoinRoom}
                            handleCloseDialog={handleCloseJoinRoom}
                        />
                    }
                />
            </Routes>
            {openJoinRoom && (
                <JoinRoomDialog
                    openDialog={openJoinRoom}
                    handleCloseDialog={handleCloseJoinRoom}
                />
            )}
        </Styled.HomeContainer>
    )
}

export default TenantHome
