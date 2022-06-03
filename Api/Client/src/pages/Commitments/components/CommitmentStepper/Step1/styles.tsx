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
const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const LeftSide = styled(Wrapper)``
export const RightSide = styled(Wrapper)``
