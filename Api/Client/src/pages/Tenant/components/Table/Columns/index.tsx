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
            src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-1/83445388_2423230741323586_2331765335868309504_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8z02AlxXRqYAX9MBL_E&_nc_ht=scontent-hkg4-1.xx&oh=00_AT9Z4jgrdBfbSLuuxayD13vX_FeGsGW2mxGp_GfWazq5fQ&oe=62D50A75"
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
