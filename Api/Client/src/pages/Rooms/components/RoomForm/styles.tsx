import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 300px;
    margin: 16px;

    ${down('md')} {
        flex-direction: column;
    }
`
export const Side = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
