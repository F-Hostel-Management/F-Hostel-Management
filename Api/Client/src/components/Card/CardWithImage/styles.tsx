import { down } from 'styled-breakpoints'
import styled from 'styled-components'

import { Card, CardMedia } from '@mui/material'

export const CardContainer = styled(Card)`
    max-width: 800px;
    min-height: 232px;
    display: flex;
    align-items: center;

    margin: 32px 0;
    padding: 8px 16px;
    border-radius: 8px !important;
    box-shadow: 5px 7px 26px -5px #cdd4e7 !important;

    ${down('md')} {
        display: block;
    }
`

export const CardImage = styled.img`
    height: 200px;
    width: 267px;
    border-radius: 8px;
    border: 1px solid var(--color-gray-500);

    ${down('md')} {
        width: 100%;
    }
`
