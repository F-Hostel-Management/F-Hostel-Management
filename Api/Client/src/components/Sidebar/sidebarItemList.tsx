import * as React from 'react'

import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone'
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone'
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone'
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone'
import GroupTwoToneIcon from '@mui/icons-material/GroupTwoTone'
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone'
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone'
import ReceiptTwoToneIcon from '@mui/icons-material/ReceiptTwoTone'
import TableRestaurantTwoToneIcon from '@mui/icons-material/TableRestaurantTwoTone'

interface ISidebarItem {
    icon: React.ReactElement
    label: string
    path: string
}

export const sidebarItemList: {
    owner: Array<{
        groupLabel: string
        items: Array<ISidebarItem>
    }>
    manager: Array<{
        groupLabel: string
        items: Array<ISidebarItem>
    }>
    tenant: Array<{
        groupLabel: string
        items: Array<ISidebarItem>
    }>
} = {
    owner: [
        {
            groupLabel: '--MAIN',
            items: [
                {
                    icon: <DashboardTwoToneIcon />,
                    label: 'Dashboard',
                    path: '/home/dashboard',
                },
                {
                    icon: <MeetingRoomTwoToneIcon />,
                    label: 'Rooms',
                    path: '/home/rooms',
                },
                {
                    icon: <FaceTwoToneIcon />,
                    label: 'Tenants',
                    path: '/home/tenants',
                },
                {
                    icon: <GroupTwoToneIcon />,
                    label: 'Managers',
                    path: '/home/managers',
                },
                {
                    icon: <NotificationsNoneTwoToneIcon />,
                    label: 'Notifications',
                    path: '/home/notifications',
                },
                {
                    icon: <ChatBubbleTwoToneIcon />,
                    label: 'Tickets',
                    path: '/home/tickets',
                },
                {
                    icon: <CalendarMonthTwoToneIcon />,
                    label: 'Scheduling Invoices',
                    path: '/home/schedulingInvoices',
                },
                {
                    icon: <ReceiptTwoToneIcon />,
                    label: 'Invoices',
                    path: '/home/invoices',
                },
                {
                    icon: <DescriptionTwoToneIcon />,
                    label: 'Commitments',
                    path: '/home/commitments',
                },
                {
                    icon: <TableRestaurantTwoToneIcon />,
                    label: 'Facilities',
                    path: '/home/facilities',
                },
            ],
        },
    ],
    manager: [
        {
            groupLabel: '--MAIN',
            items: [],
        },
    ],
    tenant: [
        {
            groupLabel: '--MAIN',
            items: [],
        },
    ],
}
