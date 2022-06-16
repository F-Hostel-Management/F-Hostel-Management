import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const QrContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 100%;
    margin-top: 32px;
    padding: 0 48px;

    ${down('md')} {
        flex-direction: column;
    }
`
export const Wrapper = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
`
export const WrapperLeft = styled(Wrapper)``
export const WrapperRight = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${down('md')} {
        height: auto;
    }
`
export const QrFile = styled.div`
    position: absolute;
    left: 50%;
    bottom: 4px;
    transform: translateX(-50%);
    z-index: 1;
`
