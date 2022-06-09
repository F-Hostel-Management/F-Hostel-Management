import React, { FC, useEffect } from 'react'

import OwnerHome from './OwnerHome'
import TenantHome from './TenantHome'
import { removeItem } from '../../utils/LocalStorageUtils'
import { useSelector } from 'react-redux'
import { getUserRole } from '../../slices/authSlice'
import { ERole } from '../../utils/enums'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { fetchHostelList, fetchRoomList } from '../../slices/homeSlice'
interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
    const dispatch = useAppDispatch()
    const role = useSelector(getUserRole)
    const rooms = useAppSelector(({ home }) => home.roomList)
    const hostels = useAppSelector(({ home }) => home.hostelList)

    useEffect(() => {
        removeItem('currentHostelId')
        const FetchingData = async () => {
            switch (role) {
                case ERole.TENANT_ROLE: {
                    dispatch(fetchRoomList())
                    break
                }
                case ERole.MANAGER_ROLE: {
                    dispatch(fetchHostelList())
                    break
                }
                case ERole.OWNER_ROLE: {
                    dispatch(fetchHostelList())
                    break
                }
            }
        }
        FetchingData()
    }, [dispatch, role])

    return role === ERole.TENANT_ROLE ? (
        <TenantHome rooms={rooms} />
    ) : (
        <OwnerHome hostels={hostels} />
    )
}

export default Home
