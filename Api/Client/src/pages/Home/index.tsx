import React, { FC, useEffect, useState } from 'react'

import OwnerHome from './OwnerHome'
import TenantHome from './TenantHome'
import { getListHostel } from '../../services/hostels'
import { IHostel } from '../../interface/IHostel'
interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const [hostels, setHostels] = useState<IHostel[]>([])
    useEffect(() => {
        const FetchingData = async () => {
            setHostels(await getListHostel())
        }
        FetchingData()
    }, [])
    const role = 1
    return role ? <OwnerHome hostels={hostels} /> : <TenantHome />
}

export default Home
