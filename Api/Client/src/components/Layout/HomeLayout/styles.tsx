import styled from 'styled-components'

export const Container = styled.div<{ loading: boolean }>`
    animation: var(--animation-transitionsIn) 1s;
    display: ${(props) => (props.loading ? 'none' : 'block')};
`

export const BodyWrapper = styled.div`
    padding-top: var(--nav-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: var(--bgr-color);
    min-height: 100vh;
`
