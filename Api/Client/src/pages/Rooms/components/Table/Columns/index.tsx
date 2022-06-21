import { GridColDef } from '@mui/x-data-grid'
import { IUseGridData } from '../../../../../hooks/useGridData'
import { IRoom } from '../../../../../interface/IRoom'
import RoomStatus from '../../RoomStatus'
import ActionButtons from '../ActionButtons'

export const createColumns = ({
    renderCell,
    createColumn,
    renderValueGetter,
}: IUseGridData<IRoom>): GridColDef[] => {
    return [
        createColumn('roomName', 'Room Name', 300),
        renderValueGetter(
            'area',
            <span>
                Area (m<sup>2)</sup>
            </span>,
            200,
            (params) => params.area?.toString() || ''
        ),
        createColumn('maximumPeople', 'Maximum People', 200),
        renderCell('status', 'Status', 150, RoomStatus),
        renderCell('actions', 'Actions', 150, ActionButtons),
    ]
}
