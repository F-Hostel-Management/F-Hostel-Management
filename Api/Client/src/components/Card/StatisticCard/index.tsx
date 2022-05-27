import React, { FC, ReactElement } from 'react'

import HotelIcon from '@mui/icons-material/Hotel'
import { Typography } from '@mui/material'

import LinearProgress from '../../Progress/LinearProgress'
import * as Styled from './styles'

interface IStatisticCardProps {
    icon: ReactElement
    label: string
    count: number
    progress: number
    bgrColor: string
}

const StatisticCard: FC<IStatisticCardProps> = ({
    icon = <HotelIcon />,
    label = 'Rooms Available',
    count = 287,
    progress = 40,
    bgrColor = '#6f42c1',
}) => {
    return (
        <Styled.CardContainer>
            <Styled.CardContentWrapper>
                <Styled.CardIcon bgrColor={bgrColor}>{icon}</Styled.CardIcon>
                <Styled.Statistic>
                    <Typography variant="subtitle1" mb={1}>
                        {label}
                    </Typography>
                    <Typography variant="h3">
                        <strong>{count}</strong>
                    </Typography>
                </Styled.Statistic>
            </Styled.CardContentWrapper>
            <LinearProgress bgrColor={bgrColor} progress={progress} />
        </Styled.CardContainer>
    )
}

export default StatisticCard
