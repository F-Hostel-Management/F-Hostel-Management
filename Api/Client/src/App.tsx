import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import styled from 'styled-components'

const AppContainer = styled.div<{ loading: boolean }>`
    animation: var(--animation-transitionsIn) 1s;
    display: ${(props) => (props.loading ? 'none' : 'block')};
`

function App(): React.ReactElement {
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const startup = async () => {
            const response = await RestCaller.get('Users/info', {
                error: { show: false },
            })
            setTimeout(() => setIsLoading(false), 2000)

            if (!response || response.isError) return

            const result: IUser = response.result
            dispatch(setCurrentUser(result))
        }
        startup()
    }, [])

    return (
        <Fragment>
            <Loading loading={isLoading} />
            {!isLoading && (
                <AppContainer loading={isLoading}>
                    <Router>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
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
                                                        <Layout
                                                            {...route.props}
                                                        >
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
                </AppContainer>
            )}
        </Fragment>
    )
}

export default App
