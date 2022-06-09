import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    min-height: 320px;
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    ${down('md')} {
        flex-direction: column;
    }
`
