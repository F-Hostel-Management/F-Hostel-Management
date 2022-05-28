import React, { FC } from 'react'

import { Typography } from '@mui/material'

import * as Styled from './styles'

interface IGreetingProps {}

const Greeting: FC<IGreetingProps> = (props) => {
    return (
        <Styled.Container>
            <Typography variant="h2" mb={2}>
                <Styled.Span>WELCOME BACK</Styled.Span>
                <Styled.Span>F-HOSTEL</Styled.Span>
            </Typography>
            <Typography variant="h4" mb={2} sx={{ fontStyle: 'italic' }}>
                Be ready to get the best services!
            </Typography>
        </Styled.Container>
    )
}

export default Greeting
