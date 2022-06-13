import { GridColDef } from '@mui/x-data-grid'
import ActionButtons from '../ActionButtons'
import RoomStatus from '../RoomStatus'

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
        renderCell('actions', 'Actions', 100, ActionButtons),
    ]
}
