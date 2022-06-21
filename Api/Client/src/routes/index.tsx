import DefaultLayout from '../components/Layout/DefaultLayout'
import HomeLayout from '../components/Layout/HomeLayout'
import { IRoute } from '../interface/IRoute'

import Commitments from '../pages/Commitments'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import FillInformation from '../pages/FillInformation'
import Rooms from '../pages/Rooms'
import Facilities from '../pages/Facilities'
import Invoices from '../pages/Invoices'
import InvoiceSchedule from '../pages/InvoiceSchedule'
import { PaymentCallback } from '../pages/Invoices/components/Payment/Callback'
import Tenant from '../pages/Tenant'

const publicRoutes: IRoute[] = [
    {
        path: '/login',
        component: Login,
        name: 'Login',
        layout: null,
    },
    {
        path: '/fillInformation',
        component: FillInformation,
        name: 'FillInformation',
        layout: null,
    },
]

const privateRoutes: IRoute[] = [
    {
        path: '/home/*',
        component: Home,
        name: 'Home',
        layout: HomeLayout,
        props: {
            title: 'Home',
        },
    },
    {
        path: '/home/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        layout: DefaultLayout,
        props: {
            title: 'Dashboard',
        },
    },
    {
        path: 'home/tenants',
        component: Tenant,
        name: 'Tenants',
        layout: DefaultLayout,
        props: {
            title: 'Tenants',
        },
    },
    {
        path: '/home/commitments',
        component: Commitments,
        name: 'Commitments',
        layout: DefaultLayout,
        props: {
            title: 'Commitments',
        },
    },
    {
        path: 'home/profile',
        component: Profile,
        name: 'Profile',
        layout: DefaultLayout,
        props: {
            title: 'Profile',
        },
    },
    {
        path: '/home/rooms/*',
        component: Rooms,
        name: 'Rooms',
        layout: DefaultLayout,
        props: {
            title: 'Rooms',
        },
    },
    {
        path: '/home/facilities',
        component: Facilities,
        name: 'Facilities',
        layout: DefaultLayout,
        props: {
            title: 'Facilities',
        },
    },
    {
        path: '/home/invoices',
        component: Invoices,
        name: 'Invoices',
        layout: DefaultLayout,
        props: {
            title: 'Invoices',
        },
    },
    {
        path: '/home/schedulingInvoices',
        component: InvoiceSchedule,
        name: 'InvoicesSchedule',
        layout: DefaultLayout,
        props: {
            title: 'Invoices Schedule',
        },
    },
    {
        path: '/home/invoices/callback',
        component: PaymentCallback,
        name: 'VnPay Result',
        layout: DefaultLayout,
        props: {
            title: 'VnPay Result',
        },
    },
]

export { publicRoutes, privateRoutes }
