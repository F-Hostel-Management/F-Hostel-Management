import { GridColDef } from '@mui/x-data-grid'
import { formatDate } from '../../../../utils/FormatDate'
import ActionButtons from '../ActionButtons'
import CommitmentStatus from '../CommitmentStatus'

export const createColumns = (
    renderCell: any,
    createColumn: any,
    renderValueGetter: any
): GridColDef[] => {
    return [
        createColumn('commitmentCode', 'Code', 100),
        renderValueGetter(
            'ownerName',
            'Owner',
            200,
            (params: Record<string, any>) => params.owner?.name
        ),
        renderValueGetter(
            'roomName',
            'Room',
            200,
            (params: Record<string, any>) => params.room?.roomName
        ),
        renderValueGetter(
            'createdDate',
            'Created Date',
            200,
            (params: Record<string, any>) =>
                formatDate(new Date(params.createdDate))
        ),
        renderValueGetter(
            'startDate',
            'Started Date',
            200,
            (params: Record<string, any>) =>
                formatDate(new Date(params.startDate))
        ),
        renderValueGetter(
            'endDate',
            'End Date',
            200,
            (params: Record<string, any>) =>
                formatDate(new Date(params.endDate))
        ),
        renderCell('status', 'Status', 180, CommitmentStatus),
        renderCell('actions', 'Actions', 150, ActionButtons),
    ]
}
