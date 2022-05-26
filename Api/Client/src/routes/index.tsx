import * as React from 'react'

import DefaultHomeLayout from '../components/Layout/DefaultHomeLayout'
import DefaultLayout from '../components/Layout/DefaultLayout'

import About from '../pages/About'
import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Profile from '../pages/Profile'

const publicRoutes: Array<{
    path: string
    component: React.ElementType
    name: string
    layout: React.ElementType
}> = [
    {
        path: '/landingPage',
        component: LandingPage,
        name: 'LandingPage',
        layout: React.Fragment,
    },
    {
        path: '/about',
        component: About,
        name: 'About',
        layout: DefaultLayout,
    },
    {
        path: '/login',
        component: Login,
        name: 'Login',
        layout: React.Fragment,
    },

]

const privateRoutes: Array<{
    path: string
    component: React.ElementType
    name: string
    layout: React.ElementType
}> = [
    {
        path: '/home/*',
        component: Home,
        name: 'Home',
        layout: DefaultHomeLayout,
    },
    {
        path: '/profile',
        component: Profile,
        name: 'Profile',
        layout: DefaultLayout,
    },
]

export { publicRoutes, privateRoutes }
