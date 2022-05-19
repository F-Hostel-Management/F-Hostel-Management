import * as React from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

import NotFound from './pages/NotFound'
import { privateRoutes, publicRoutes } from './routes'
import PrivateRoute from './routes/PrivateRouter'
import PublicRoute from './routes/PublicRoute'

interface IRoute {
    path: string
    component: React.ElementType
    name: string
    layout: React.ElementType
}

function App(): React.ReactElement {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/landingPage" />} />
                    <Route path="/" element={<PrivateRoute />}>
                        {privateRoutes.map((route: IRoute) => {
                            const Layout = route.layout
                            const Component = route.component
                            return (
                                <Route
                                    key={route.name}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Component />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Route>
                    <Route path="/" element={<PublicRoute />}>
                        <Route>
                            {publicRoutes.map((route: IRoute) => {
                                const Layout = route.layout
                                const Component = route.component
                                return (
                                    <Route
                                        key={route.name}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Component />
                                            </Layout>
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
