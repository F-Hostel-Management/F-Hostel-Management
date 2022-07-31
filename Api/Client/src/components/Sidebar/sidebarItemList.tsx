import * as React from 'react'

import Icon from '../Icon'

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
                    icon: <Icon name="dashboard" />,
                    label: 'Dashboard',
                    path: '/home/dashboard',
                },
                {
                    icon: <Icon name="room" />,
                    label: 'Rooms',
                    path: '/home/rooms',
                },
                {
                    icon: <Icon name="tenant" />,
                    label: 'Tenants',
                    path: '/home/tenants',
                },
                {
                    icon: <Icon name="manager" />,
                    label: 'Managers',
                    path: '/home/managers',
                },
                // {
                //     icon: <Icon name="notification" />,
                //     label: 'Notifications',
                //     path: '/home/notifications',
                // },
                // {
                //     icon: <Icon name="ticket" />,
                //     label: 'Tickets',
                //     path: '/home/tickets',
                // },
                {
                    icon: <Icon name="schedulingInvoice" />,
                    label: 'Scheduling Invoices',
                    path: '/home/schedulingInvoices',
                },
                {
                    icon: <Icon name="invoice" />,
                    label: 'Invoices',
                    path: '/home/invoices',
                },
                {
                    icon: <Icon name="commitment" />,
                    label: 'Commitments',
                    path: '/home/commitments',
                },
                {
                    icon: <Icon name="facility" />,
                    label: 'Facilities',
                    path: '/home/facilities',
                },
            ],
        },
    ],
    manager: [
        {
            groupLabel: '--MAIN',
            items: [
                {
                    icon: <Icon name="dashboard" />,
                    label: 'Dashboard',
                    path: '/home/dashboard',
                },
                {
                    icon: <Icon name="room" />,
                    label: 'Rooms',
                    path: '/home/rooms',
                },
                {
                    icon: <Icon name="tenant" />,
                    label: 'Tenants',
                    path: '/home/tenants',
                },
                // {
                //     icon: <Icon name="notification" />,
                //     label: 'Notifications',
                //     path: '/home/notifications',
                // },
                // {
                //     icon: <Icon name="ticket" />,
                //     label: 'Tickets',
                //     path: '/home/tickets',
                // },
                {
                    icon: <Icon name="schedulingInvoice" />,
                    label: 'Scheduling Invoices',
                    path: '/home/schedulingInvoices',
                },
                {
                    icon: <Icon name="invoice" />,
                    label: 'Invoices',
                    path: '/home/invoices',
                },
                {
                    icon: <Icon name="commitment" />,
                    label: 'Commitments',
                    path: '/home/commitments',
                },
                {
                    icon: <Icon name="facility" />,
                    label: 'Facilities',
                    path: '/home/facilities',
                },
            ],
        },
    ],
    tenant: [
        {
            groupLabel: '--MAIN',
            items: [
                {
                    icon: <Icon name="room" />,
                    label: 'My Room',
                    path: '/home/rooms',
                },
                {
                    icon: <Icon name="invoice" />,
                    label: 'Invoices',
                    path: '/home/invoices',
                },
            ],
        },
    ],
}
