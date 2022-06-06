import { GridRenderCellParams, GridColDef } from '@mui/x-data-grid'
import { ElementType } from 'react'

export const useGridData = (): any => {
    const createColumn = (
        field: string,
        headerName: string,
        width: number
    ): GridColDef => {
        return {
            field: field,
            renderHeader: () => <strong>{headerName}</strong>,
            width: width,
            editable: false,
        }
    }

    const renderCell = (
        field: string,
        headerName: string,
        width: number,
        component: ElementType
    ): GridColDef => {
        const Component = component
        return {
            field: field,
            renderHeader: () => <strong>{headerName}</strong>,
            width: width,
            renderCell: (params: GridRenderCellParams<any>) => (
                <Component rowData={params?.row} />
            ),
        }
    }

    const renderValueSetter = (
        field: string,
        headerName: string,
        width: number,
        getValue: (params: Record<string, any>) => string
    ): GridColDef => {
        return {
            field: field,
            renderHeader: () => <strong>{headerName}</strong>,
            width: width,
            valueGetter: (params) => {
                return getValue(params?.row)
            },
        }
    }

    return { renderCell, createColumn, renderValueSetter }
}
