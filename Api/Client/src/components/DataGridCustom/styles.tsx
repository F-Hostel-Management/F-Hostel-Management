import styled from 'styled-components'

import { DataGrid as Grid } from '@mui/x-data-grid'

interface IDataGridContainerProps {
    width?: string
    height?: string
    color?: string
}
export const DataGridContainer = styled.div<IDataGridContainerProps>`
    width: ${(prop) => (prop.width ? prop.width : '100%')};
    height: ${(prop) => (prop.height ? prop.height : '600px')};
    padding: 1.5rem;
    border-bottom: 1px solid #dee4ec;
    border-radius: 8px;

    margin: auto;
`

export const DataGrid = styled(Grid)`
    border: none !important;
`