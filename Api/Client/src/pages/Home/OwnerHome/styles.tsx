import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const HomeContainer = styled.div`
    padding: 32px 0;

    ${down('md')} {
        padding: 0 16px;
    }
`
export const ActionWrapper = styled.div``
export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > button {
        margin: 0px 16px;
        min-width: 240px;
    }

    ${down('md')} {
        flex-direction: column;
        & > button {
        margin: 4px 0;
    }
    }
`
