import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    ${down('md')} {
        flex-direction: column;
        justify-content: center;
    }
`

export const PagingWrapper = styled.div`
    display: flex;
    align-items: center;

    ${down('md')} {
        flex-direction: column;
        justify-content: center;
    }
`
