import React, { FC } from 'react'

import OwnerHome from './OwnerHome'
import TenantHome from './TenantHome'

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const role = 1
    return role ? <OwnerHome /> : <TenantHome />
}

export default Home
