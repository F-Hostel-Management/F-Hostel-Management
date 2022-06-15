import * as React from 'react'
import { useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'
import { AppState } from '../stores/reduxStore'

interface IPublicRouteProps {
}

const PublicRoute: React.FunctionComponent<IPublicRouteProps> = () => {
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticated
    )
    return isAuthenticated ? <Navigate to="/home" /> : <Outlet />
}

export default PublicRoute
