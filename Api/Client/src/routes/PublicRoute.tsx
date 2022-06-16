import * as React from 'react'
import { useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'
import { useRouter } from '../hooks/routerHook'
import { AppState } from '../stores/reduxStore'

interface IPublicRouteProps {}

const PublicRoute: React.FunctionComponent<IPublicRouteProps> = () => {
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticated
    )
    const { getGoBackWithRedirect } = useRouter()
    return isAuthenticated ? (
        <Navigate to={getGoBackWithRedirect('/home')} />
    ) : (
        <Outlet />
    )
}

export default PublicRoute
