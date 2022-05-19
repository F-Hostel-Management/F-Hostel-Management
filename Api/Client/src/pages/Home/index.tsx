import * as React from 'react'

import { Route, Routes } from 'react-router-dom'

import NotFound from '../NotFound'
import CreateHostel from './CreateHostel'

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return (
        <div>
            <h1>Home</h1>
            <Routes>
                <Route path="/create" element={<CreateHostel />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Home
