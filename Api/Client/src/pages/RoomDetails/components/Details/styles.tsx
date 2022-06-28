import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const Container = styled.div`
    padding: 32px;
`

export const Side = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`
export const List = styled.ul`
    display: flex;
    justify-content: space-around;
    margin: 8px;
    list-style: circle;

    ${down('md')} {
        flex-direction: column;
    }
`
export const Item = styled.li`
    display: flex;
    align-items: center;
    opacity: 0.9;
    & > svg {
        margin: 4px 8px 4px 0;
    }
`
