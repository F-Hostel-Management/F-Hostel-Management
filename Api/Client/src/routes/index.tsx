import React, { Fragment, ElementType } from 'react'

import DefaultLayout from '../components/Layout/DefaultLayout'
import HomeLayout from '../components/Layout/HomeLayout'

import About from '../pages/About'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import LandingPage from '../pages/LandingPage'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'

const publicRoutes: Array<{
    path: string
    component: ElementType
    name: string
    layout: ElementType
}> = [
    {
        path: '/landingPage',
        component: LandingPage,
        name: 'LandingPage',
        layout: Fragment,
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
        layout: Fragment,
    },
    {
        path: '/register',
        component: Register,
        name: 'Register',
        layout: Fragment,
    },
]

const privateRoutes: Array<{
    path: string
    component: ElementType
    name: string
    layout: ElementType
}> = [
    {
        path: '/home',
        component: Home,
        name: 'Home',
        layout: HomeLayout,
    },
    {
        path: '/home/dashboard',
        component: Dashboard,
        name: 'Dashboard',
        layout: DefaultLayout,
    },
    {
        path: 'home/profile',
        component: Profile,
        name: 'Profile',
        layout: DefaultLayout,
    },
]

export { publicRoutes, privateRoutes }
