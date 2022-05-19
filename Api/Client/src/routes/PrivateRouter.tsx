import * as React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

interface IPrivateRouteProps {
}

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = () => {
    let isAuthenticated = true
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
