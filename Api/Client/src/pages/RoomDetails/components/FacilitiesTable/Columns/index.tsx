import { GridColDef } from '@mui/x-data-grid'
import { IUseGridData } from '../../../../../hooks/useGridData'
import { IFacilityManagement } from '../../../../../interface/IFacility'
import ActionButtons from '../ActionButtons'

export const createColumns = ({
    renderCell,
    createColumn,
    renderValueGetter,
}: IUseGridData<IFacilityManagement>): GridColDef[] => {
    return [
        renderValueGetter(
            'name',
            'Name',
            300,
            (params) => params.facility.name
        ),
        renderValueGetter(
            'type',
            'Category',
            200,
            (params) => params.facility.type
        ),
        createColumn('quantity', 'Quantity', 150),
        renderValueGetter('price', 'Price', 150, (params) =>
            params.facility.price.toString()
        ),
        createColumn('description', 'Description', 300),
        renderCell('actions', 'Actions', 100, ActionButtons),
    ]
}
