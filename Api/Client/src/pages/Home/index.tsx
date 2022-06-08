import React, { FC, useEffect, useState } from 'react'

import OwnerHome from './OwnerHome'
import TenantHome from './TenantHome'
import { getListHostel } from '../../services/HostelService'
import { IHostel } from '../../interface/IHostel'
import { removeItem } from '../../utils/LocalStorageUtils'
import { useSelector } from 'react-redux'
import { getUserRole } from '../../slices/authSlice'
import { ERole } from '../../utils/enums'
import { IRoom } from '../../interface/IRoom'
interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const role = useSelector(getUserRole)
    const [hostels, setHostels] = useState<IHostel[]>([])
    const [rooms, setRooms] = useState<IRoom[]>([])

    useEffect(() => {
        removeItem('currentHostelId')
        const FetchingData = async () => {
            switch (role) {
                case ERole.TENANT_ROLE: {
                    // do something
                    break
                }
                case ERole.MANAGER_ROLE: {
                    setHostels(await getListHostel())
                    break
                }
                case ERole.OWNER_ROLE: {
                    setHostels(await getListHostel())
                    break
                }
            }
        }
        FetchingData()
    }, [])

    return role === ERole.TENANT_ROLE ? (
        <TenantHome />
    ) : (
        <OwnerHome hostels={hostels} />
    )
}

export default Home
