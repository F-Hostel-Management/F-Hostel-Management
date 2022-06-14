import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    padding: 32px;
`

export const Side = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
`
export const List = styled.ul`
    margin-left: 8px;
    list-style: circle;
`
export const Item = styled.li`
    display: flex;
    align-items: center;
    opacity: 0.8;
    & > svg {
        margin: 4px 8px 4px 0;
    }
`
