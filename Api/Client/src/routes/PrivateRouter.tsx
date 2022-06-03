import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Navigate, Outlet } from 'react-router-dom'
import { IUser } from '../interface/user'
import { setCurrentUser } from '../slices/authSlice'
import { AppState } from '../stores/reduxStore'
import { RestCaller } from '../utils/RestCaller'

interface IPrivateRouteProps {}

const PrivateRoute: React.FunctionComponent<IPrivateRouteProps> = () => {
    const isAuthenticated = useSelector(
        (state: AppState) => state.auth.isAuthenticated
    )
    const dispatch = useDispatch()
    useEffect(() => {
        const checkAuthentication = async () => {
            if (isAuthenticated) return

            const response = await RestCaller.get('Users/info')
            if (!response || response.isError) return

            const result: IUser = response.result
            dispatch(setCurrentUser(result))
        }

        checkAuthentication()
    }, [])
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
