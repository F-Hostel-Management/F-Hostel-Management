import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const ContainerStep = styled.div`
    width: 100%;
    min-height: 300px;
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${down('md')} {
        flex-direction: column;
    }
`
