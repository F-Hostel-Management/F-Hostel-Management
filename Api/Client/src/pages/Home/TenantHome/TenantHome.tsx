import React, { FC } from 'react'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import GroupsIcon from '@mui/icons-material/Groups'
import HotelIcon from '@mui/icons-material/Hotel'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { Button, Grid, Typography } from '@mui/material'

import * as Styled from './styles'
import RoomCard from '../components/RoomCard'

interface ITenantHomeProps {}

const TenantHome: FC<ITenantHomeProps> = (props) => {
    return (
        <Styled.HomeContainer>
            <Styled.ActionJoinWrapper>
                <Styled.Greeting>
                    <Typography variant="h2" mb={2}>
                        <Styled.Span>WELCOME BACK</Styled.Span>
                        <Styled.Span>F-HOSTEL</Styled.Span>
                    </Typography>
                    <Typography
                        variant="h4"
                        mb={2}
                        sx={{ fontStyle: 'italic' }}
                    >
                        Be ready to get the best services!
                    </Typography>
                </Styled.Greeting>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QrCodeScannerIcon />}
                >
                    Scan to join
                </Button>
            </Styled.ActionJoinWrapper>
            <React.Fragment>
                <RoomCard />
                <RoomCard status={true} />
            </React.Fragment>
        </Styled.HomeContainer>
    )
}

export default TenantHome
