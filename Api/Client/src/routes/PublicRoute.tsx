import * as React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface IPublicRouteProps {}

const PublicRoute: React.FunctionComponent<IPublicRouteProps> = () => {
    let isAuthenticated = false
    return isAuthenticated ? <Navigate to="/home" /> : <Outlet />
}

export default PublicRoute
