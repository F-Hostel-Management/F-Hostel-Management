import React, { FC, ReactElement } from 'react'

import { Hotel } from '@mui/icons-material'
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
    icon = <Hotel />,
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
                    <Typography variant="subtitle2" mb={1}>
                        <strong>{label}</strong>
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
