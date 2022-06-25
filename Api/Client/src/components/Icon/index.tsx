import { ElementType, FC } from 'react'
import {
    CalendarMonthTwoTone as CalendarMonthTwoToneIcon,
    ChatBubbleTwoTone as ChatBubbleTwoToneIcon,
    DashboardTwoTone as DashboardTwoToneIcon,
    DescriptionTwoTone as DescriptionTwoToneIcon,
    FaceTwoTone as FaceTwoToneIcon,
    GroupTwoTone as GroupTwoToneIcon,
    MeetingRoomTwoTone as MeetingRoomTwoToneIcon,
    NotificationsNoneTwoTone as NotificationsNoneTwoToneIcon,
    ReceiptTwoTone as ReceiptTwoToneIcon,
    TableRestaurantTwoTone as TableRestaurantTwoToneIcon,
    AddCircle as AddCircleIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Description as DescriptionIcon,
    QrCode as QrCodeIcon,
    PermIdentity as PermIdentityIcon,
    ExitToApp as ExitToAppIcon,
    Key as KeyIcon,
    Language as LanguageIcon,
} from '@mui/icons-material'

export type IconName =
    | 'dashboard'
    | 'room'
    | 'tenant'
    | 'manager'
    | 'notification'
    | 'ticket'
    | 'schedulingInvoice'
    | 'invoice'
    | 'commitment'
    | 'facility'
    | 'create'
    | 'update'
    | 'delete'
    | 'description'
    | 'qrCode'
    | 'profile'
    | 'logout'
    | 'key'
    | 'language'

const icon: Record<IconName, ElementType> = {
    // page icons
    dashboard: DashboardTwoToneIcon,
    room: MeetingRoomTwoToneIcon,
    tenant: FaceTwoToneIcon,
    manager: GroupTwoToneIcon,
    notification: NotificationsNoneTwoToneIcon,
    ticket: ChatBubbleTwoToneIcon,
    schedulingInvoice: CalendarMonthTwoToneIcon,
    invoice: ReceiptTwoToneIcon,
    commitment: DescriptionTwoToneIcon,
    facility: TableRestaurantTwoToneIcon,
    profile: PermIdentityIcon,
    // action icons
    create: AddCircleIcon,
    update: EditIcon,
    delete: DeleteIcon,
    description: DescriptionIcon,
    qrCode: QrCodeIcon,
    logout: ExitToAppIcon,
    // others icons
    key: KeyIcon,
    language: LanguageIcon,
}

interface IIconProps {
    name: IconName
    [x: string | number | symbol]: unknown
}

const Icon: FC<IIconProps> = ({ name, ...others }) => {
    const IconComponent = icon[name]
    return <IconComponent {...others} />
}

export default Icon
