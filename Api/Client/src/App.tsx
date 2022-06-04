import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { IRoute } from './interface/IRoute'
import { IUser } from './interface/IUser'
import LandingPage from './pages/LandingPage'

import NotFound from './pages/NotFound'
import { privateRoutes, publicRoutes } from './routes'
import PrivateRoute from './routes/PrivateRouter'
import PublicRoute from './routes/PublicRoute'
import { setCurrentUser, setIsAuthenticated } from './slices/authSlice'

import { RestCaller } from './utils/RestCaller'

function App(): React.ReactElement {
    const dispatch = useDispatch()
    useEffect(() => {
        const checkAuthentication = async () => {
            const response = await RestCaller.get('Users/info')
            if (!response || response.isError)
                return dispatch(setIsAuthenticated(false))

            const result: IUser = response.result
            dispatch(setCurrentUser(result))
        }
        checkAuthentication()
    }, [])
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/landingPage" />} />
                    <Route path="/landingPage" element={<LandingPage />} />
                    <Route path="/" element={<PrivateRoute />}>
                        {privateRoutes.map((route: IRoute) => {
                            const Layout =
                                route.layout == null
                                    ? React.Fragment
                                    : route.layout
                            const Component = route.component
                            return (
                                <Route
                                    key={route.name}
                                    path={route.path}
                                    element={
                                        route.layout == null ? (
                                            <Layout>
                                                <Component />
                                            </Layout>
                                        ) : (
                                            <Layout {...route.props} >
                                                <Component />
                                            </Layout>
                                        )
                                    }
                                />
                            )
                        })}
                    </Route>
                    <Route path="/" element={<PublicRoute />}>
                        <Route>
                            {publicRoutes.map((route: IRoute) => {
                                const Layout =
                                    route.layout == null
                                        ? React.Fragment
                                        : route.layout
                                const Component = route.component
                                return (
                                    <Route
                                        key={route.name}
                                        path={route.path}
                                        element={
                                            route.layout == null ? (
                                                <Layout>
                                                    <Component />
                                                </Layout>
                                            ) : (
                                                <Layout {...route.props}>
                                                    <Component />
                                                </Layout>
                                            )
                                        }
                                    />
                                )
                            })}
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
