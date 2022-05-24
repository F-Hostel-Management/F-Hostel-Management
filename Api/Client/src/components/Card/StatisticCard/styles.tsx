import { up } from 'styled-breakpoints'
import styled from 'styled-components'

import { Card, CardContent } from '@mui/material'

export const CardContainer = styled(Card)`
    display: block;
    padding: 0 24px 24px 24px;
    border-radius: 8px;
    box-shadow: 5px 3px 10px 0 rgb(21 15 15 / 30%) !important;
`

export const CardContentWrapper = styled(CardContent)`
    @media (max-width: 1024px) {
        display: flex;
        justify-content: space-between;
    }
`

export const CardIcon = styled.div`
    width: 50px;
    height: 50px;
    margin: 25px 0;
    border-radius: 8px;

    background-color: #6f42c1;
    color: #fff;
    box-shadow: 5px 3px 10px 0 rgb(21 15 15 / 30%);

    display: flex;
    align-items: center;
    justify-content: center;
`
export const Statistic = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding: 24px 0;
`
