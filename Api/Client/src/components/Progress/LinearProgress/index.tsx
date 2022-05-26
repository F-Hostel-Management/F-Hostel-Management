import React, { FC } from 'react'

import {
    linearProgressClasses,
    LinearProgress as Progress,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { LightenDarkenColor } from '../../../utils/LightenDarkenColor'

interface ILinearProgressProps {
    progress: number
    bgrColor: string
}

const BorderLinearProgress = styled(Progress)<{ bgrColor: string }>(
    ({ theme, bgrColor }) => ({
        height: 12,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor:
                theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
            background: `linear-gradient(to right, ${LightenDarkenColor(
                bgrColor,
                5
            )}, ${LightenDarkenColor(
                bgrColor,
                80
            )} ) !important`,
        },
    })
)

const LinearProgress: FC<ILinearProgressProps> = ({ progress, bgrColor }) => {
    return (
        <BorderLinearProgress
            bgrColor={bgrColor}
            variant="determinate"
            value={progress}
        />
    )
}

export default LinearProgress
