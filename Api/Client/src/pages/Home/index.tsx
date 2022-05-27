import React, { FC } from 'react'
import TenantHome from './TenantHome/TenantHome'

interface IHomeProps {}

const Home: FC<IHomeProps> = (props) => {
    const role = 0
    return role ? null : <TenantHome />
}

export default Home
