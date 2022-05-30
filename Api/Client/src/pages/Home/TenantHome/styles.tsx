import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const HomeContainer = styled.div`
    padding: 32px 0;

    ${down('md')} {
        padding: 0 16px;
    }
`
export const ActionJoinWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-top: 8px;
`


