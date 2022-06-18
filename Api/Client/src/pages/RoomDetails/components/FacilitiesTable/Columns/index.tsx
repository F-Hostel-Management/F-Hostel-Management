import { GridColDef } from '@mui/x-data-grid'
import { IFacilityManagement } from '../../../../../interface/IFacility'
import ActionButtons from '../ActionButtons'

export const createColumns = (
    renderCell: any,
    createColumn: any,
    renderValueGetter: any
): GridColDef[] => {
    return [
        renderValueGetter(
            'name',
            'Name',
            300,
            (params: IFacilityManagement) => params.facility.name
        ),
        renderValueGetter(
            'type',
            'Category',
            200,
            (params: IFacilityManagement) => params.facility.type
        ),
        createColumn('quantity', 'Quantity', 150),
        renderValueGetter(
            'price',
            'Price',
            150,
            (params: IFacilityManagement) => params.facility.price
        ),
        createColumn('description', 'Description', 400),
        renderCell('actions', 'Actions', 100, ActionButtons),
    ]
}
