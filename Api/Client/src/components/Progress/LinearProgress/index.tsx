import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import { linearProgressClasses, LinearProgress as Progress } from '@mui/material';

interface ILinearProgressProps {}

const BorderLinearProgress = styled(Progress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}))

const LinearProgress: React.FunctionComponent<ILinearProgressProps> = (
    props
) => {
    return <BorderLinearProgress variant="determinate" value={50} />
}

export default LinearProgress
