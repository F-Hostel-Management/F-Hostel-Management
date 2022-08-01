import { GridColDef } from '@mui/x-data-grid'
import { IUseGridData } from '../../../../../hooks/useGridData'
import ActionButtons from '../ActionButtons'
import Avatar from '@mui/material/Avatar'
import { IRoomTenant } from '../../../../../interface/IRoomTenant'
import { formatDate } from '../../../../../utils/FormatDate'

const UserImage = (rowData: IRoomTenant) => {
    return (
        <Avatar
            alt="avatar tenant"
            variant="square"
            sx={{
                width: 32,
                height: 32,
                borderRadius: '4px',
                border: '1px solod #fff',
                filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
            }}
        />
    )
}

export const createColumns = ({
    renderCell,
    createColumn,
    renderValueGetter,
}: IUseGridData<IRoomTenant>): GridColDef[] => {
    return [
        renderCell('image', 'Image', 80, UserImage),
        renderValueGetter(
            'name',
            'Name',
            200,
            (params) => params.tenant.name || ''
        ),
        renderValueGetter('dateOfBirth', 'Date of Birth', 150, (params) =>
            formatDate(new Date(params.tenant.dateOfBirth || ''))
        ),
        renderValueGetter(
            'phone',
            'Phone',
            200,
            (params) => params.tenant.phone || ''
        ),
        renderValueGetter(
            'email',
            'Email',
            200,
            (params) => params.tenant.email || ''
        ),
        renderValueGetter(
            'room',
            'Room',
            200,
            (params) => params.room.roomName || ''
        ),
        renderCell('actions', 'Actions', 80, ActionButtons),
    ]
}
