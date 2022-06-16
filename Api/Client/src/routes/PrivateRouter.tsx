import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'
import { useRouter } from '../hooks/routerHook'
import { AppState } from '../stores/reduxStore'

interface IPrivateRouteProps {}

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = () => {
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticated
    )
    const { getGoForwardWithRedirect } = useRouter()
    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={getGoForwardWithRedirect('/login')} />
    )
}

export default PrivateRoute
