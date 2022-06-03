import React, { FC } from 'react'

import Greeting from '../components/Greeting'
import RoomCard from '../components/RoomCard'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { Button } from '@mui/material'

import * as Styled from './styles'
import JoinRoomDialog from '../components/JoinRoomDialog'
import { useDialog } from '../../../hooks/useDialog'

interface ITenantHomeProps {}

const TenantHome: FC<ITenantHomeProps> = () => {
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
                <RoomCard />
                <RoomCard status={true} />
            </React.Fragment>

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
