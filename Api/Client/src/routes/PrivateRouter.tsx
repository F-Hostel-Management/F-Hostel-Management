import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'
import { AppState } from '../stores/reduxStore'

interface IPrivateRouteProps {}

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = () => {
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticated
    )
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
