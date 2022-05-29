import React, { FC } from 'react'

import Greeting from '../components/Greeting'
import RoomCard from '../components/RoomCard'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner'
import { Button } from '@mui/material'

import * as Styled from './styles'

interface ITenantHomeProps {}

const TenantHome: FC<ITenantHomeProps> = () => {
    return (
        <Styled.HomeContainer>
            <Styled.ActionJoinWrapper>
                <Greeting />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<QrCodeScannerIcon />}
                    className="hello"
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
