import * as React from 'react'

import { Style } from '@mui/icons-material'
import HotelIcon from '@mui/icons-material/Hotel'
import { Card, CardContent, Typography } from '@mui/material'

import LinearProgress from '../../Progress/LinearProgress'
import * as Styled from './styles'

interface IStatisticCardProps {}

const StatisticCard: React.FunctionComponent<IStatisticCardProps> = (props) => {
    return (
        <Styled.CardContainer>
            <Styled.CardContentWrapper>
                <Styled.CardIcon>
                    <HotelIcon />
                </Styled.CardIcon>
                <Styled.Statistic>
                    <Typography variant="h4" mb={1}>Rooms Available</Typography>
                    <Typography variant="h3">287</Typography>
                </Styled.Statistic>
            </Styled.CardContentWrapper>
            <LinearProgress />
        </Styled.CardContainer>
    )
}

export default StatisticCard
