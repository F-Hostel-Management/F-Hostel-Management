import DefaultLayout from '../components/Layout/DefaultLayout'
import HomeLayout from '../components/Layout/HomeLayout'
import { IRoute } from '../interface/IRoute'

import About from '../pages/About'
import Commitments from '../pages/Commitments'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import FillInformation from '../pages/FillInformation'
import Rooms from '../pages/Rooms'
import Facilities from '../pages/Facilities'

const publicRoutes: IRoute[] = [
    {
        path: '/about',
        component: About,
        name: 'About',
        layout: null,
    },
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
        path: '/home',
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
        path: '/home/rooms',
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
]

export { publicRoutes, privateRoutes }
