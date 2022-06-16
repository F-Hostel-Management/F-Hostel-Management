import styled from 'styled-components'

import { Card, CardContent } from '@mui/material'

export const CardContainer = styled(Card)`
    display: block;
    padding: 0 16px 16px 16px;
    border-radius: 10px;
    box-shadow: 5px 3px 10px 0 rgb(21 15 15 / 30%) !important;
`

export const CardContentWrapper = styled(CardContent)`
    display: block;
    min-height: 110px;
    padding: 0;

    @media (min-width: 1600px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

export const CardIcon = styled.div<{ bgrColor: string }>`
    width: 50px;
    height: 50px;
    margin: 16px 0;
    border-radius: 8px;

    background-color: ${(props) => props.bgrColor};
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
