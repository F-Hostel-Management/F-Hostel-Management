import styled from 'styled-components'

export const ChartContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ChartDetails = styled.ul`
    margin-top: 16px;
`
export const Item = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 8px 0;
    border-bottom: 1px solid var(--color-gray-500);

    &:first-child {
        border-top: 1px solid var(--color-gray-500);
    }
`
export const LeftPartItem = styled.div`
    display: flex;
    align-items: center;

    & > svg {
        margin-right: 8px;
    }
`
