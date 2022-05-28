import React, { FC } from 'react'

import OwnerHome from './OwnerHome'
import TenantHome from './TenantHome'

interface IHomeProps {}

const Home: FC<IHomeProps> = (props) => {
    const role = 1
    return role ? <OwnerHome /> : <TenantHome />
}

export default Home
