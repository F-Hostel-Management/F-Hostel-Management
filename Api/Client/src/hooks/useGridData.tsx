import { GridRenderCellParams, GridColDef } from '@mui/x-data-grid'
import { ElementType } from 'react'

export interface IUseGridData {
    createColumn: (
        field: string,
        headerName: string,
        width: number
    ) => GridColDef

    renderCell: (
        field: string,
        headerName: string,
        width: number,
        component: ElementType
    ) => GridColDef

    renderValueGetter: (
        field: string,
        headerName: string,
        width: number,
        getValue: (params: Record<string, any>) => string
    ) => GridColDef
}

export const useGridData = (): IUseGridData => {
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

    const renderValueGetter = (
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

    return { renderCell, createColumn, renderValueGetter }
}
