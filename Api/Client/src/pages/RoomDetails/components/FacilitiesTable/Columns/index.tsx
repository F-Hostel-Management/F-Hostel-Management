import { GridColDef } from '@mui/x-data-grid'
import ActionButtons from '../ActionButtons'

export const createColumns = (
    renderCell: any,
    createColumn: any
): GridColDef[] => {
    return [
        createColumn('name', 'Facility Name', 400),
        createColumn('type', 'Category', 200),
        createColumn('quantity', 'Quantity', 200),
        createColumn('price', 'Price', 150),
        renderCell('actions', 'Actions', 130, ActionButtons),
    ]
}
