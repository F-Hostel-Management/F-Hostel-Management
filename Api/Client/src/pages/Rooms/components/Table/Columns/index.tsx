import { GridColDef } from '@mui/x-data-grid'
import RoomStatus from '../../RoomStatus'
import ActionButtons from '../ActionButtons'

export const createColumns = (
    renderCell: any,
    createColumn: any,
    renderValueGetter: any
): GridColDef[] => {
    return [
        createColumn('roomName', 'Room Name', 300),
        renderValueGetter(
            'area',
            <span>
                Area (m<sup>2)</sup>
            </span>,
            200,
            (params: Record<string, any>) => params.area
        ),
        createColumn('maximumPeople', 'Maximum People', 200),
        renderCell('status', 'Status', 150, RoomStatus),
        renderCell('actions', 'Actions', 150, ActionButtons),
    ]
}
