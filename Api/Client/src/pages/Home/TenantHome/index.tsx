import React, { FC } from 'react'

import Greeting from '../components/Greeting'
import RoomCard from '../components/RoomCard'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { Button } from '@mui/material'

import * as Styled from './styles'
import { useDialog } from '../../../hooks/useDialog'
import { IRoom } from '../../../interface/IRoom'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ScanQrCode from '../components/ScanQrCode'
import Commitment from '../components/Commitment'
import NotFound from '../../NotFound'

interface ITenantHomeProps {
    rooms: IRoom[]
}

const TenantHome: FC<ITenantHomeProps> = ({ rooms }) => {
    const navigate = useNavigate()
    const [openJoinRoom, handleOpenJoinRoom, handleCloseJoinRoom] = useDialog()

    return (
        <Styled.HomeContainer>
            <Styled.ActionJoinWrapper>
                <Greeting />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QrCodeScannerIcon />}
                    className="hello"
                    onClick={handleOpenJoinRoom}
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
                    element={<Commitment />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            {openJoinRoom && (
                <ScanQrCode
                    openDialog={openJoinRoom}
                    handleCloseDialog={handleCloseJoinRoom}
                />
            )}
        </Styled.HomeContainer>
    )
}

export default TenantHome
