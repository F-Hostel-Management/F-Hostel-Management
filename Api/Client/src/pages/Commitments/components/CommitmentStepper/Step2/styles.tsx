import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const ContainerStep = styled.div`
    width: 100%;
    min-height: 320px;
    margin: 16px;
    display: flex;

    ${down('md')} {
        flex-direction: column;
    }
`
