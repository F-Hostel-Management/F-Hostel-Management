import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const ContainerStep = styled.div`
    width: 100%;
    min-height: 400;
    margin: 16px 0;
    display: flex;
    justify-content: space-around;

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

export const UploadWrapper = styled.div`
    width: 400px;
    height: 300px;
    border: 1px solid #000;
`
