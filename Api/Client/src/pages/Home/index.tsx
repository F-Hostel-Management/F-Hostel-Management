import * as React from 'react'

import { Route, Routes } from 'react-router-dom'
import Loading from '../../components/Loading'

import NotFound from '../NotFound'
import CreateHostel from './CreateHostel'

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return (
        <div>
            <Loading />
        </div>
    )
}

export default Home
