import * as React from 'react'

import {
    CalendarMonthTwoTone,
    ChatBubbleTwoTone,
    DashboardTwoTone,
    DescriptionTwoTone,
    FaceTwoTone,
    GroupTwoTone,
    MeetingRoomTwoTone,
    NotificationsNoneTwoTone,
    ReceiptTwoTone,
    TableRestaurantTwoTone,
} from '@mui/icons-material'

export interface ISidebarItem {
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
                    icon: <DashboardTwoTone />,
                    label: 'Dashboard',
                    path: '/home/dashboard',
                },
                {
                    icon: <MeetingRoomTwoTone />,
                    label: 'Rooms',
                    path: '/home/rooms',
                },
                {
                    icon: <FaceTwoTone />,
                    label: 'Tenants',
                    path: '/home/tenants',
                },
                {
                    icon: <GroupTwoTone />,
                    label: 'Managers',
                    path: '/home/managers',
                },
                {
                    icon: <NotificationsNoneTwoTone />,
                    label: 'Notifications',
                    path: '/home/notifications',
                },
                {
                    icon: <ChatBubbleTwoTone />,
                    label: 'Tickets',
                    path: '/home/tickets',
                },
                {
                    icon: <CalendarMonthTwoTone />,
                    label: 'Scheduling Invoices',
                    path: '/home/schedulingInvoices',
                },
                {
                    icon: <ReceiptTwoTone />,
                    label: 'Invoices',
                    path: '/home/invoices',
                },
                {
                    icon: <DescriptionTwoTone />,
                    label: 'Commitments',
                    path: '/home/commitments',
                },
                {
                    icon: <TableRestaurantTwoTone />,
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
            items: [
                {
                    icon: <ReceiptTwoTone />,
                    label: 'Invoices',
                    path: '/home/invoices',
                },
            ],
        },
    ],
}
