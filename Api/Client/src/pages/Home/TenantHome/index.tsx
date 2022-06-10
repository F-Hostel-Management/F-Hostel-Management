import React, { FC } from 'react'

import Greeting from '../components/Greeting'
import RoomCard from '../components/Card/RoomCard'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { Button } from '@mui/material'

import * as Styled from './styles'
import { useDialog } from '../../../hooks/useDialog'
import { IRoom } from '../../../interface/IRoom'
import { Route, Routes } from 'react-router-dom'
import ScanQrCodeDialog from '../components/Dialog/ScanQrCodeDialog'
import ConfirmCommitmentDialog from '../components/Dialog/ConfirmCommitmentDialog'

interface ITenantHomeProps {
    rooms: IRoom[]
}

const TenantHome: FC<ITenantHomeProps> = ({ rooms }) => {
    const [openScanQr, handleOpenScanQr, handleCloseScanQr] = useDialog()

    return (
        <Styled.HomeContainer>
            <Styled.ActionJoinWrapper>
                <Greeting />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QrCodeScannerIcon />}
                    className="hello"
                    onClick={handleOpenScanQr}
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
                    element={<ConfirmCommitmentDialog />}
                />
            </Routes>
            {openScanQr && (
                <ScanQrCodeDialog
                    openDialog={openScanQr}
                    handleCloseDialog={handleCloseScanQr}
                />
            )}
        </Styled.HomeContainer>
    )
}

export default TenantHome
