import styled, { keyframes } from 'styled-components'

const wave = keyframes`
    0% {
        transform: translateY(0px);
    }
    40% {
        transform: translateY(-30px)
    }
    60% {
        transform: translateY(0px)
    }
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-white);
    width: 100vw;
    height: 100vh;
`

type PropTypeLetter = {
    delay: number;
}
export const Letter = styled.span<PropTypeLetter>`
    display: inline-block;
    padding: 0 2px;
    font-size: 3.2rem;
    color: var(--text-color-dark);
    animation: ${wave} 1s ease-in-out;
    animation-delay: calc(0.1s * ${props => props.delay});

    -webkit-box-reflect: below 1px linear-gradient(transparent, #0004);
`
