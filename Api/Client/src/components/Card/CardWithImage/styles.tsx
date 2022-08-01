import { down } from 'styled-breakpoints'
import styled from 'styled-components'

import { Card, CardContent } from '@mui/material'

export const CardContainer = styled(Card)`
    position: relative;
    width: 700px;
    height: 232px;
    display: flex;
    align-items: center;

    margin: 32px 0;
    padding: 8px 16px;
    border-radius: 8px !important;
    box-shadow: 5px 7px 26px -5px #cdd4e7 !important;

    ${down('md')} {
        flex-direction: column;
        width: 100%;
        height: fit-content;
    }
`

export const CardImage = styled.div`
    height: 200px;
    width: 267px;
    border-radius: 8px;
    border: 1px solid var(--color-gray-500);
    padding: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    ${down('md')} {
        width: 90%;
    }
`

export const Image = styled.img`
    width: 100%;

    ${down('md')} {
        width: 90%;
    }
`

export const CardContentMUI = styled(CardContent)`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 0;

    ${down('md')} {
        padding: 16px 0 !important;
        width: 90%;
    }
`

export const Content = styled.div`
    flex: 1;
    padding-left: 6px;
`
