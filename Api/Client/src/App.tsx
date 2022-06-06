import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import Loading from './components/Loading'
import { IRoute } from './interface/IRoute'
import { IUser } from './interface/IUser'
import LandingPage from './pages/LandingPage'

import NotFound from './pages/NotFound'
import { privateRoutes, publicRoutes } from './routes'
import PrivateRoute from './routes/PrivateRouter'
import PublicRoute from './routes/PublicRoute'
import { setCurrentUser } from './slices/authSlice'
import { RestCaller } from './utils/RestCaller'

function App(): React.ReactElement {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const startup = async () => {
            const response = await RestCaller.get('Users/info', false)
            setTimeout(() => setIsLoading(false), 2000)

            if (!response || response.isError) return

            const result: IUser = response.result
            dispatch(setCurrentUser(result))
        }
        startup()
    }, [])

    return (
        <div className="App">
            {isLoading ? (
                <Loading />
            ) : (
                <Router>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/landingPage" />}
                        />
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
                                                <Layout {...route.props}>
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
                </Router>
            )}
        </div>
    )
}

export default App
